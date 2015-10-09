'use strict';

// Tars main moduels init
// It is a global var
require('./tars/tars');

// Using modules
var os = require('os');
var path = require('path');
var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var runSequence = tars.packages.runSequence.use(gulp);
var browserSync = tars.packages.browserSync;
var env = process.env;

// Configs
var browserSyncConfig = tars.config.browserSyncConfig;
var notify = tars.packages.notify;

/***********/
/* HELPERS */
/***********/
// You can add your own helpers here. Helpers folder is tars/helpers

// Set ulimit to 4096 for *nix FS. It needs to work with big amount of files
if (os.platform() !== 'win32') {
    tars.helpers.setUlimit();
}

// Load files from dir recursively and synchronously
var fileLoader = tars.helpers.fileLoader;

/***************/
/* END HELPERS */
/***************/

/*********/
/* TASKS */
/*********/

// SYSTEM'S TASKS
// require system tasks
fileLoader('./tars/tasks').forEach(function (file) {
    require(file)();
});

// USER'S TASKS
// You can add your own task.
// Task have to be in tars/user-tasks folder
// require user-tasks
fileLoader('./tars/user-tasks').forEach(function (file) {
    require(file)();
});

/*************/
/* END TASKS */
/*************/

/***********/
/* WATCHERS */
/***********/

// Build dev-version with watchers and livereloader.
// Also could tunnel your markup to web, if you use flag --tunnel
gulp.task('dev', ['build-dev'], function () {

    tars.options.notify = true;

    if (tars.flags.lr || tars.flags.tunnel) {
        gulp.start('browsersync');
    }

    // SYSTEM WATCHERS
    // require watchers
    fileLoader('./tars/watchers').forEach(function (file) {
        require(file)();
    });

    // USER'S WATCHERS
    // require user-watchers
    fileLoader('./tars/user-watchers').forEach(function (file) {
        require(file)();
    });

    if (tars.config.notifyConfig.useNotify && env.NODE_ENV !== 'production' && !env.DISABLE_NOTIFIER) {
        notify({
            title: tars.config.notifyConfig.title,
            icon: path.resolve(process.cwd() + '/tars/icons/tars.png')
        }).write('Build has been created!');
    } else {
        tars.say('Build has been created!');
    }
});

/****************/
/* END WATCHERS */
/****************/

/**************/
/* MAIN TASKS */
/**************/

// Build dev-version (without watchers)
// You can add your own tasks in queue
gulp.task('build-dev', function (cb) {
    tars.options.notify = false;

    runSequence(
        'service:clean',
        ['images:minify-svg', 'images:raster-svg'],
        [
            'css:make-sprite-for-svg', 'css:make-fallback-for-svg', 'css:make-sprite'
        ],
        [
            'css:compile-css', 'css:compile-css-for-ie8',
            'html:concat-modules-data',
            'js:move-separate', 'js:processing'
        ],
        [
            'html:compile-templates',
            'other:move-misc-files', 'other:move-fonts', 'other:move-assets',
            'images:move-content-img', 'images:move-plugins-img', 'images:move-general-img'
        ],
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task
gulp.task('build', function () {
    runSequence(
        'build-dev',
        [
            'html:minify-html', 'images:minify-raster-img'
        ],
        'service:pre-build',
        [
            'css:compress-css'
        ],
        'service:zip-build',
        function () {
            console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
            tars.say(gutil.colors.green('✔') + gutil.colors.green.bold(' Build has been created successfully!'));

            if (tars.config.useBuildVersioning) {
                tars.say(gutil.colors.white.bold('Build version is: ', tars.options.build.version));
            }
            console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
        }
    );
});

// Default task. Just start build task
gulp.task('default', function () {
    gulp.start('build');
});

// Init task. Just start init task
gulp.task('init', function () {
    gulp.start('service:init');
});

// Re-init task. Just start re-init task
gulp.task('re-init', function () {
    gulp.start('service:re-init');
});

// Update-deps task. Just start update-deps task
gulp.task('update-deps', function () {
    gulp.start('service:update-deps');
});

// Task for starting browsersync module
gulp.task('browsersync', function (cb) {

    // Serve files and connect browsers
    browserSync({
        server: {
            baseDir: browserSyncConfig.baseDir
        },
        logConnections: true,
        debugInfo: true,
        injectChanges: false,
        port: browserSyncConfig.port,
        open: browserSyncConfig.open,
        browser: browserSyncConfig.browser,
        startPath: browserSyncConfig.startUrl,
        notify: browserSyncConfig.useNotifyInBrowser,
        tunnel: tars.flags.tunnel,
        reloadOnRestart: true
    });

    cb(null);
});

/******************/
/* END MAIN TASKS */
/******************/

/*****************/
/* HELPERS TASKS */
/*****************/

gulp.task('svg-actions', function (cb) {
    if (tars.flags.ie8 || tars.flags.ie) {
        runSequence(
            ['images:minify-svg', 'images:raster-svg'],
            ['css:make-fallback-for-svg', 'css:make-sprite-for-svg'],
            cb
        );
    } else {
        runSequence(
            'images:minify-svg',
            'css:make-sprite-for-svg',
            cb
        );
    }
});

gulp.task('compile-templates-with-data-reloading', function (cb) {
    runSequence(
        'html:concat-modules-data',
        'html:compile-templates',
        cb
    );
});

/*********************/
/* END HELPERS TASKS */
/*********************/
