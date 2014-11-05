// Using modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),

    // Flags
    useLiveReload = gutil.env.lr || false,
    useTunnelToWeb = gutil.env.tunnel || false,

    // Configs
    projectConfig = require('./projectConfig'),
    browserSyncConfig = projectConfig.browserSyncConfig,
    templaterName = require('./gulpy/helpers/templaterNameSetter')(),
    templateExtension = 'jade',
    cssPreprocExtension = projectConfig.cssPreprocessor.toLowerCase(),
    projectConfigTemlater = projectConfig.templater.toLowerCase(),
    buildOptions = {};

    // Generate build version
    if (projectConfig.useBuildVersioning) {
        buildOptions.buildVersion = '_ver-' + (new Date()).toString();
        buildOptions.buildVersion = buildOptions.buildVersion.replace(/ /g,'_').replace(/:/g,'-').match(/.*\d\d-\d\d-\d\d/)[0];
    } else {
        buildOptions.buildVersion = '';
    }

    // Set template's extension
    if (templaterName === 'handlebars') {
        templateExtension = 'html';
    } else {
        templateExtension = 'jade';
    }

    if (cssPreprocExtension === 'stylus') {
        cssPreprocExtension = 'styl';
    }

    if (gutil.env.release) {
        buildOptions.hash = Math.random().toString(36).substring(7);
    } else {
        buildOptions.hash = '';
    }


/***********/
/* HELPERS */
/***********/
// You can add your own helpers here. Helpers folder is gulpy/helpers

// Watcher by node-watch
var watcher = require('./gulpy/helpers/watcher');

// Set ulimit to 2048 for *nix FS. It needs to work with big amount of files
require('./gulpy/helpers/setUlimit')(2048);

/***************/
/* END HELPERS */
/***************/



/*********/
/* TASKS */
/*********/

// USERS TASKS

// You can add your own task.
// There is a template of gulp-task
// Task have to be in gulpy/userTasks folder
// Example:
// require('./gulpy/userTasks/exampleTask')();


// SYSTEM TASKS
// Default tasks

// Create file-structure
require('./gulpy/tasks/create-fs')(buildOptions);

// Init builder. Make folders
require('./gulpy/tasks/init')(buildOptions);

// Re-init builder. Make folders
require('./gulpy/tasks/re-init')(buildOptions);

// Clean dev directory and cache
require('./gulpy/tasks/clean')(buildOptions);

// Template compilation
require('./gulpy/tasks/compile-templates')(buildOptions);

// Concat data for modules
require('./gulpy/tasks/concat-modules-data')(buildOptions);

// Make sprite task
require('./gulpy/tasks/raster-svg')(buildOptions);

// Make png-sprite task for svg files for old browsers
require('./gulpy/tasks/make-fallback-for-svg')(buildOptions);

// SVG minification
require('./gulpy/tasks/minify-svg')(buildOptions);

// PNG, JPG minification
require('./gulpy/tasks/minify-raster-img')(buildOptions);

// Move SVG-files to dev directory
require('./gulpy/tasks/move-svg')(buildOptions);

// Convert svg includes to base64 in css
require('./gulpy/tasks/svg-to-base64')(buildOptions);

// Make sprite task
require('./gulpy/tasks/make-sprite')(buildOptions);

// Css compilation
require('./gulpy/tasks/compile-css')(buildOptions);

// Css compilation for ie8
require('./gulpy/tasks/compile-css-for-ie8')(buildOptions);

// Css compilation for ie9
require('./gulpy/tasks/compile-css-for-ie9')(buildOptions);

// Compress css
require('./gulpy/tasks/compress-css')(buildOptions);

// Move JS-files for libs that have to be in separate files
require('./gulpy/tasks/move-separate-js')(buildOptions);

// Concat JS for modules, libs and plugins to 1 file.
// Also lint modules' js
require('./gulpy/tasks/js-processing')(buildOptions);

// Check JS (code style and errors)
require('./gulpy/tasks/lint')(buildOptions);

// Strip console.log and debugger from main.js
require('./gulpy/tasks/strip-debug')(buildOptions);

// Compress js-files and strip debug
require('./gulpy/tasks/compress-js')(buildOptions);

// Move misc files
require('./gulpy/tasks/move-misc-files')(buildOptions);

// Move images from assets modules of modules
require('./gulpy/tasks/move-assets')(buildOptions);

// Move images for content
require('./gulpy/tasks/move-content-img')(buildOptions);

// Move images for plugins
require('./gulpy/tasks/move-plugins-img')(buildOptions);

// Move fonts-files to dev directory
require('./gulpy/tasks/move-fonts')(buildOptions);

// Generate font-files (eot, woff, svg) from .ttf-file
require('./gulpy/tasks/generate-fonts')(buildOptions);

// Copy files from dev to build directory
// Create build directory with new build version
require('./gulpy/tasks/pre-build')(buildOptions);

// Create zip-archive
require('./gulpy/tasks/minify-html')(buildOptions);

// Create zip-archive
require('./gulpy/tasks/zip-build')(buildOptions);


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


    // USERS WATCHERS

    // You can add your own watcher
    // Example:
    // watcher( path-string or array of paths to files that you'd like to watch for,
    //                 filter path-string or array of paths to files that you'd like to unwatch or false,
    //                 function(filename) {
    //                      gulp.start('example-task');
    //                  });


    // SYSTEM WATCHERS

    // Watcher for images for sprite (png)
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite/**/*.png', false, function(filename) {
        gulp.start('make-sprite');
    });

    // Watcher for svg-images
    if (projectConfig.useSVG) {
        watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/**/*.svg', false, function(filename, cb) {
            gulp.start('svg-actions');
        });
    }

    // Watcher for common scss(or less)-files and scss(or less)-files of plugins
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.cssPreprocessor + '/**/*.' + cssPreprocExtension, false, function(filename) {
        gulp.start('compile-css');
    });

    // Watcher for modules stylies
    watcher(
            './markup/modules/**/*.' + cssPreprocExtension,
            [
                './markup/modules/**/ie9.' + cssPreprocExtension,
                './markup/modules/**/ie8.' + cssPreprocExtension
            ], function(filename) {
        gulp.start('compile-css');

        if (projectConfig.useIE8Stylies) {
            gulp.start('compile-css-for-ie8');
        }

        if (projectConfig.useIE9Stylies) {
            gulp.start('compile-css-for-ie9');
        }
    });

    // Watcher for ie8 stylies
    if (projectConfig.useIE8Stylies) {
        watcher('./markup/modules/**/ie8.' + cssPreprocExtension, false, function(filename) {
            gulp.start('compile-css-for-ie8');
        });
    }

    // Watcher for ie9 stylies
    if (projectConfig.useIE9Stylies) {
        watcher('./markup/modules/**/ie9.' + cssPreprocExtension, false, function(filename) {
            gulp.start('compile-css-for-ie9');
        });
    }

    // Watcher for templates-files of templates
    watcher('./markup/pages/**/*.' + templateExtension, false, function(filename) {
        gulp.start('compile-templates');
    });

    // Watcher for templates-files of modules
    watcher('./markup/modules/**/*.' + templateExtension, false, function(filename) {
        gulp.start('compile-templates');
    });

    // Watcher for data-files of modules
    watcher('./markup/modules/**/mData.js', false, function(filename) {
        gulp.start('compile-templates-with-data-reloading');
    });

    if (projectConfig.jsPathsToConcatBeforeModulesJs.length) {
        // Watcher for js-files before modules js
        watcher(projectConfig.jsPathsToConcatBeforeModulesJs, false, function(filename) {
            gulp.start('js-processing');
        });
    }

    // Watcher for js-files of modules
    watcher('./markup/modules/**/*.js', './markup/modules/**/mData.js', function(filename) {
        gulp.start('js-processing');
    });

    if (projectConfig.jsPathsToConcatAfterModulesJs.length) {
        // Watcher for js-files after modules js
        watcher(projectConfig.jsPathsToConcatAfterModulesJs, false, function(filename) {
            gulp.start('js-processing');
        });
    }

    // Watcher for js-files of plugins
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/js/plugins/**/*.js', false, function(filename) {
        gulp.start('js-processing');
    });

    // Watcher for js-files of libs
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/js/libs/**/*.js', false, function(filename) {
        gulp.start('js-processing');
    });

    // Watcher for images in assets dir of modules
    watcher('./markup/modules/**/assets/**/*.*', false, function(filename) {
        gulp.start('move-assets');
    });

    // Watcher for content images
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content/**/*.*', false, function(filename) {
        gulp.start('move-content-img');
    });

    // Watcher for images of plugins
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins/**/*.*', false, function(filename) {
        gulp.start('move-plugins-img');
    });

    // Watcher for misc files
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/misc/**/*.*', false, function(filename) {
        gulp.start('move-misc-files');
    });

    // Watcher for font files.
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/fonts/**/*.ttf', false, function(filename) {
        gulp.start('fonts-actions');
    });

    // Watcher for separate Js files files
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/js/separateJs/**/*.js', false, function(filename) {
        gulp.start('move-separate-js');
    });
});

/***************/
/* END WATCHERS */
/***************/



/**************/
/* MAIN TASKS */
/***************/

// Build dev-version (without watchers)
// You can add your own tasks in queue

gulp.task('build-dev', function(cb) {
    runSequence(
        'clean',
        'move-svg',
        'raster-svg',
        ['make-fallback-for-svg', 'make-sprite'],
        ['compile-css', 'compile-css-for-ie8', 'compile-css-for-ie9'],
        'concat-modules-data',
        [
            'move-separate-js', 'js-processing', 'compile-templates',
            'move-misc-files', 'move-assets', 'move-content-img', 'move-plugins-img'
        ],
        'fonts-actions',
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task

gulp.task('build', function(cb) {
    runSequence(
        'build-dev',
        ['minify-html', 'minify-raster-img', 'minify-svg'],
        'pre-build',
        'svg-to-base64',
        ['compress-js', 'compress-css'],
        'zip-build',
        cb
    );
});

// Default task. Just start build task
gulp.task('default', function() {
    gulp.start('build');
});

// Task for starting browsersync module
gulp.task('browsersync', function(cb) {

    // Serve files and connect browsers
    browserSync({
        server: {
            baseDir: './dev'
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
    runSequence(
        'move-svg',
        'raster-svg',
        'make-fallback-for-svg',
        cb
    );
});

gulp.task('fonts-actions', function(cb) {
    runSequence(
        'generate-fonts',
        'move-fonts',
        cb
    );
});

gulp.task('compile-templates-with-data-reloading', function(cb) {
    runSequence(
        'concat-modules-data',
        'compile-templates',
    cb);
});

/*********************/
/* END HELPERS TASKS */
/*********************/