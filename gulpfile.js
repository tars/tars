// Using modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

    // Flags
var useLiveReload = gutil.env.lr || false,
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

// Set ulimit to 4096 for *nix FS. It needs to work with big amount of files
require('./gulpy/helpers/setUlimit')(4096);

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
// require('./gulpy/user-tasks/example-task')();


// SYSTEM TASKS
// Default tasks

// Create file-structure
require('./gulpy/tasks/services/create-fs')(buildOptions);

// Init builder. Make folders
require('./gulpy/tasks/services/init')(buildOptions);

// Re-init builder. Make folders
require('./gulpy/tasks/services/re-init')(buildOptions);

// Clean dev directory and cache
require('./gulpy/tasks/services/clean')(buildOptions);

// Template compilation
require('./gulpy/tasks/html/compile-templates')(buildOptions);

// Concat data for modules
require('./gulpy/tasks/html/concat-modules-data')(buildOptions);

// Make sprite task
require('./gulpy/tasks/images/raster-svg')(buildOptions);

// Make png-sprite task for svg files for old browsers
require('./gulpy/tasks/css/make-fallback-for-svg')(buildOptions);

// SVG minification
require('./gulpy/tasks/images/minify-svg')(buildOptions);

// PNG, JPG minification
require('./gulpy/tasks/images/minify-raster-img')(buildOptions);

// Move SVG-files to dev directory
require('./gulpy/tasks/images/move-svg')(buildOptions);

// Convert svg includes to base64 in css
require('./gulpy/tasks/images/svg-to-base64')(buildOptions);

// Make sprite task
require('./gulpy/tasks/css/make-sprite')(buildOptions);

// Css compilation
require('./gulpy/tasks/css/compile-css')(buildOptions);

// Css compilation for ie8
require('./gulpy/tasks/css/compile-css-for-ie8')(buildOptions);

// Css compilation for ie9
require('./gulpy/tasks/css/compile-css-for-ie9')(buildOptions);

// Compress css
require('./gulpy/tasks/css/compress-css')(buildOptions);

// Move JS-files for libs that have to be in separate files
require('./gulpy/tasks/js/move-separate-js')(buildOptions);

// Concat JS for modules, libs and plugins to 1 file.
// Also lint modules' js
require('./gulpy/tasks/js/js-processing')(buildOptions);

// Check JS (code style and errors)
require('./gulpy/tasks/js/lint')(buildOptions);

// Strip console.log and debugger from main.js
require('./gulpy/tasks/js/strip-debug')(buildOptions);

// Compress js-files and strip debug
require('./gulpy/tasks/js/compress-js')(buildOptions);

// Move misc files
require('./gulpy/tasks/other/move-misc-files')(buildOptions);

// Move images from assets modules of modules
require('./gulpy/tasks/images/move-assets')(buildOptions);

// Move images for content
require('./gulpy/tasks/images/move-content-img')(buildOptions);

// Move images for plugins
require('./gulpy/tasks/images/move-plugins-img')(buildOptions);

// Move general images
require('./gulpy/tasks/images/move-general-img')(buildOptions);

// Move fonts-files to dev directory
require('./gulpy/tasks/other/move-fonts')(buildOptions);

// Copy files from dev to build directory
// Create build directory with new build version
require('./gulpy/tasks/services/pre-build')(buildOptions);

// Create zip-archive
require('./gulpy/tasks/html/minify-html')(buildOptions);

// Create zip-archive
require('./gulpy/tasks/services/zip-build')(buildOptions);

// Update deps
require('./gulpy/tasks/services/update')(buildOptions);

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

        if (gutil.env.ie8) {
            gulp.start('compile-css-for-ie8');
        }

        if (gutil.env.ie9) {
            gulp.start('compile-css-for-ie9');
        }
    });

    // Watcher for modules stylies
    watcher(
            './markup/modules/**/*.' + cssPreprocExtension,
            [
                './markup/modules/**/ie9.' + cssPreprocExtension,
                './markup/modules/**/ie8.' + cssPreprocExtension
            ], function(filename) {
        gulp.start('compile-css');

        if (gutil.env.ie8) {
            gulp.start('compile-css-for-ie8');
        }

        if (gutil.env.ie9) {
            gulp.start('compile-css-for-ie9');
        }
    });

    // Watcher for ie8 stylies
    if (gutil.env.ie8) {
        watcher('./markup/modules/**/ie8.' + cssPreprocExtension, false, function(filename) {
            gulp.start('compile-css-for-ie8');
        });
    }

    // Watcher for ie9 stylies
    if (gutil.env.ie9) {
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

    // Watcher for general images
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/general/**/*.*', false, function(filename) {
        gulp.start('move-general-img');
    });

    // Watcher for misc files
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/misc/**/*.*', false, function(filename) {
        gulp.start('move-misc-files');
    });

    // Watcher for font files.
    watcher('./markup/' + projectConfig.fs.staticFolderName + '/fonts/**/*.*', false, function(filename) {
        gulp.start('move-fonts');
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
        'builder-start-screen',
        'clean',
        'move-svg',
        'raster-svg',
        ['make-fallback-for-svg', 'make-sprite'],
        ['compile-css', 'compile-css-for-ie8', 'compile-css-for-ie9'],
        'concat-modules-data',
        [
            'move-separate-js', 'js-processing', 'compile-templates',
            'move-misc-files', 'move-assets', 'move-content-img', 'move-plugins-img', 'move-general-img', 'move-fonts'
        ],
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task

gulp.task('build', function() {
    runSequence(
        'build-dev',
        ['minify-html', 'minify-raster-img', 'minify-svg'],
        'pre-build',
        'svg-to-base64',
        ['compress-js', 'compress-css'],
        'zip-build',
        function() {
            console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
            gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Release version have been created successfully!'));
            console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
        }
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

gulp.task('compile-templates-with-data-reloading', function(cb) {
    runSequence(
        'concat-modules-data',
        'compile-templates',
    cb);
});

gulp.task('builder-start-screen', function(cb) {
    var i = 0;

    console.log('\n------------------------------------------------------------');
    console.log(gutil.colors.green.bold('Build have been started. You are using:\n'));

    if (gutil.env.release) {
        console.log(gutil.colors.black.bold('• release mode;'));
    }

    if (gutil.env.min) {
        console.log(gutil.colors.black.bold('• minify mode;'));
    }

    if (gutil.env.lr) {
        console.log(gutil.colors.black.bold('• livereload mode;'));
    }

    if (gutil.env.tunnel) {
        console.log(gutil.colors.black.bold('• tunnel mode;'));
    }

    if (gutil.env.ie8) {
        console.log(gutil.colors.black.bold('• ie8 maintenance;'));
    }

    if (gutil.env.ie9) {
        console.log(gutil.colors.black.bold('• ie9 maintenance;'));
    }

    for (key in gutil.env) {
        i++;
    }

    if (i <= 1) {
        console.log(gutil.colors.black.bold('No modes.'));
    }

    console.log(gutil.colors.green.bold('\nHave a nice work.'));
    console.log(gutil.colors.green.bold('Let\'s go & create something awesome!'));

    console.log('------------------------------------------------------------\n');

    cb();
});


/*********************/
/* END HELPERS TASKS */
/*********************/