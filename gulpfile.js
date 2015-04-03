// Using modules
var os = require('os');
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

    // Flags
var useLiveReload = gutil.env.lr || false,
    useTunnelToWeb = gutil.env.tunnel || false,

    // Configs
    tarsConfig = require('./tars-config.js'),
    tarsSubconfig = require('./tars/helpers/process-config'),
    browserSyncConfig = tarsConfig.browserSyncConfig,

    buildOptions = {},
    watchOptions = {};

// Generate build version
if (tarsConfig.useBuildVersioning) {
    buildOptions.buildVersion = require('./tars/helpers/set-build-version')();
    buildOptions.buildPath = tarsConfig.buildPath + 'build' + buildOptions.buildVersion + '/';
} else {
    buildOptions.buildVersion = '';
    buildOptions.buildPath = tarsConfig.buildPath;
}


if (gutil.env.release) {
    buildOptions.hash = Math.random().toString(36).substring(7);
} else {
    buildOptions.hash = '';
}

watchOptions = {
    templateExtension: tarsSubconfig.templateExtension,
    cssPreprocExtension: tarsSubconfig.styleExtention
};

/***********/
/* HELPERS */
/***********/
// You can add your own helpers here. Helpers folder is tars/helpers

// Set ulimit to 4096 for *nix FS. It needs to work with big amount of files
if (os.platform() !== 'win32') require('./tars/helpers/set-ulimit')();

// Load files from dir recursively and synchronously
var fileLoader = require('./tars/helpers/file-loader');

/***************/
/* END HELPERS */
/***************/


/*********/
/* TASKS */
/*********/

// USER'S TASKS
// You can add your own task.
// Task have to be in tars/user-tasks folder
// Example:
// require('./tars/user-tasks/example-task')(buildOptions);


// REQUIRE TASKS
fileLoader('./tars/tasks').concat(fileLoader('./tars/user-tasks')).forEach(function(file) {
    var task = require(file);

    // You could uncomment the row bellow, to see all required tasks in console
    // gutil.log('Task:', gutil.colors.cyan(file));

    if(typeof task === 'function') {
        task(buildOptions)
    }
});

/*************/
/* END TASKS */
/*************/


/***********/
/* WATCHERS */
/***********/

// Build dev-version with watchers and livereloader.
// Also could tunnel your markup to web, if you use flag --tunnel
gulp.task('dev', ['build-dev'], function() {

    if (useLiveReload || useTunnelToWeb) {
        gulp.start('browsersync');
    }

    // REQUIRE WATCHERS
    fileLoader('./tars/watchers').concat(fileLoader('./tars/user-watchers')).forEach(function(file) {
        var watcher = require(file);

        // You could uncomment the row bellow, to see all required watchers in console
        // gutil.log('Watcher:', gutil.colors.cyan(file));

        if(typeof watcher === 'function') {
            watcher(watchOptions);
        }
    });
});

/****************/
/* END WATCHERS */
/****************/


/**************/
/* MAIN TASKS */
/**************/

// Build dev-version (without watchers)
// You can add your own tasks in queue
gulp.task('build-dev', function(cb) {
    runSequence(
        'service:builder-start-screen',
        'service:clean',
        [
            'images:minify-svg',
            'images:raster-svg'
        ],
        [
            'css:make-sprite-for-svg',
            'css:make-fallback-for-svg',
            'css:make-sprite'
        ],
        [
            'css:compile-css',
            'css:compile-css-for-ie8',
            'html:concat-modules-data',
            'js:move-separate',
            'js:processing'
        ],
        [
            'html:compile-templates',
            'other:move-misc-files',
            'other:move-fonts',
            'other:move-assets',
            'images:move-content-img',
            'images:move-plugins-img',
            'images:move-general-img'
        ],
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task
gulp.task('build', function() {
    runSequence(
        'build-dev',
        [
            'html:minify-html',
            'images:minify-raster-img'
        ],
        'service:pre-build',
        [
            'js:compress',
            'css:compress-css'
        ],
        'service:zip-build',
        function() {
            console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
            gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Release version have been created successfully!'));
            console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
        }
    );
});

// Default task. Just start build task
gulp.task('default', ['build']);

// Init task. Just start init task
gulp.task('init', function (cb) {
    runSequence('service:create-fs', 'service:init', cb);
});

// Re-init task. Just start re-init task
gulp.task('re-init', function (cb) {
    runSequence('service:remove-init-fs', 'service:create-fs', 'service:init', cb);
});

// Update-deps task. Just start update-deps task
gulp.task('update-deps', ['service:update-deps']);

// Task for starting browsersync module
gulp.task('browsersync', function(cb) {

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
        tunnel: useTunnelToWeb
    });

    cb(null);
});

/******************/
/* END MAIN TASKS */
/******************/


/*****************/
/* HELPERS TASKS */
/*****************/

gulp.task('svg-actions', function(cb) {
    if (gutil.env.ie8) {
        runSequence(
            [
                'images:minify-svg',
                'images:raster-svg'
            ],
            [
                'css:make-fallback-for-svg',
                'css:make-sprite-for-svg'
            ],
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

gulp.task('compile-templates-with-data-reloading', function(cb) {
    runSequence(
        'html:concat-modules-data',
        'html:compile-templates',
    cb);
});

/*********************/
/* END HELPERS TASKS */
/*********************/
