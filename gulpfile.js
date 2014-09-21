// Using modules
var gulp = require('gulp'),                     // Gulp JS
    gutil = require('gulp-util'),               // Gulp util module
    runSequence = require('run-sequence'),      // Run sequence module for run task in queue
    browserSync = require('browser-sync'),      // Plugin for sync with browser

    // Flags
    useLiveReload = gutil.env.lr,

    // Configs
    projectConfig = require('./projectConfig'),
    browserSyncConfig = projectConfig.browserSyncConfig,
    templateExtension = '',
    projectConfigTemlater = projectConfig.templater.toLowerCase();


if (projectConfigTemlater === 'jade') {
    templateExtension = 'jade';
} else if (projectConfigTemlater === 'handlebars' 
        || projectConfigTemlater === 'handelbars' 
        || projectConfigTemlater === 'hdb' 
        || projectConfigTemlater === 'hb') {
    templateExtension = 'html';
} else {
    templateExtension = 'jade';
}



/***********/
/* HELPERS */
/***********/
// You can add your own helpers here. Helpers folder is gulpy/helpers

// Watcher by node-watch
var watchByPattern = require('./gulpy/helpers/watcher');

// Notify for changed files in console
var fileChangedNotify = require('./gulpy/helpers/fileChangedNotify');

// Generate new version of  build
var buildVersionGenerator = require('./gulpy/helpers/buildVersionGenerator');

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
require('./gulpy/tasks/createFs')();

// Init builder. Make folders
require('./gulpy/tasks/init')();

// Clean dev directory and cache
require('./gulpy/tasks/clean')();

// Template compilation
require('./gulpy/tasks/compileTemplates')();

// Make sprite task    
require('./gulpy/tasks/rasterSvg')();

// Make png-sprite task for svg files for old browsers
require('./gulpy/tasks/makeSpriteForSvgFallback')();

// SVG minification
require('./gulpy/tasks/svgMinification')();

// Move SVG-files to dev directory
require('./gulpy/tasks/moveSvg')();

// Convert svg includes to base64 in css
require('./gulpy/tasks/svgToBase64')();

// Make sprite task    
require('./gulpy/tasks/makeSprite')();

// Css compilation
require('./gulpy/tasks/compileCss')();

// Css compilation for ie8
require('./gulpy/tasks/compileCssForIe8')();

// Css compilation for ie9
require('./gulpy/tasks/compileCssForIe9')();

// Compress css
require('./gulpy/tasks/compressCss')();

// Copy JS-files for libs that have to be in separate files
require('./gulpy/tasks/copySeparateJs')();

// Concat JS for modules, libs and plugins to 1 file.
// Also lint modules' js
require('./gulpy/tasks/concatPluginsLibsAndModulesLintModulesJs')();

// Check JS (code style and errors)
require('./gulpy/tasks/lint')();

// Strip console.log and debugger from main.js
require('./gulpy/tasks/stripDebug')();

// Compress js-files and strip debug
require('./gulpy/tasks/compressMainJs')();

// Move misc files
require('./gulpy/tasks/moveMiscFiles')();

// Move images from assets modules of modules
require('./gulpy/tasks/moveAssets')();

// Move images for content
require('./gulpy/tasks/moveContentImg')();

// Move images for plugins
require('./gulpy/tasks/movePluginsImg')();

// Move fonts-files to dev directory
require('./gulpy/tasks/moveFonts')();

// Generate font-files (eot, woff, svg) from .ttf-file
require('./gulpy/tasks/generateFonts')();

// Copy files from dev to build directory
// Create build directory with new build version
require('./gulpy/tasks/preBuild')();

// Create zip-archive
require('./gulpy/tasks/zipBuild')();

/*************/
/* END TASKS */
/*************/



/***********/
/* WATCHERS */
/***********/

// Build dev-version with watchers and livereloader
gulp.task('dev', ['build-dev'], function() {

    if (useLiveReload) {
        gulp.start('browsersync');
    }


    // USERS WATCHERS

    // You can add your own watcher
    // Example:
    // watchByPattern( path-string or array of paths to files that you'd like to watch for, 
    //                 filter path-string or array of paths to files taht you'd like to unwatch,
    //                 function(filename) {
    //                      fileChangedNotify(filename);
    //                      gulp.start('example-task'); 
    //                  });


    // SYSTEM WATCHERS

    // Watcher for images for sprite (png)
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite/**/*.png', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('make-sprite');
    });

    // Watcher for svg-images
    if (projectConfig.useSVG) {
        watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/**/*.svg', false, function(filename, cb) {
            fileChangedNotify(filename);
            gulp.start('svg-actions');
        });
    }

    // Watcher for common scss(or less)-files and scss(or less)-files of plugins
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.cssPreprocessor + '/**/*.' + projectConfig.cssPreprocessor, false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-css');
    }); 

    // Watcher for scss(or less)-files of modules
    watchByPattern('./markup/modules/**/*.' + projectConfig.cssPreprocessor, false, function(filename) {
        fileChangedNotify(filename);
        if (filename.indexOf('ie8.' + projectConfig.cssPreprocessor) > -1) {
            // Compile css-files for ie8
            gulp.start('compile-css-for-ie8');
        } else if (filename.indexOf('ie9.' + projectConfig.cssPreprocessor) > -1) {
            // Compile css-files for ie9
            gulp.start('compile-css-for-ie9');
        } else {
            // Compile css-files for all browsers
            gulp.start('compile-css');
            gulp.start('compile-css-for-ie8');
            gulp.start('compile-css-for-ie9');
        }
        
    });

    // Watcher for templates-files of templates
    watchByPattern('./markup/pages/**/*.' + templateExtension, false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-templates');
    });

    // Watcher for templates-files of modules
    watchByPattern('./markup/modules/**/*.' + templateExtension, false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('compile-templates');
    });

    if (projectConfig.jsPathsToConcatBeforeModulesJs.length) {
        // Watcher for js-files before modules js
        watchByPattern(projectConfig.jsPathsToConcatBeforeModulesJs, false, function(filename) {
            fileChangedNotify(filename);
            gulp.start('concat-plugins-libs-and-modules-lint-modules-js');
        });
    }   

    // Watcher for js-files of modules
    watchByPattern('./markup/modules/**/*.js', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('concat-plugins-libs-and-modules-lint-modules-js');
    });

    if (projectConfig.jsPathsToConcatAfterModulesJs.length) {
        // Watcher for js-files after modules js
        watchByPattern(projectConfig.jsPathsToConcatAfterModulesJs, false, function(filename) {
            fileChangedNotify(filename);
            gulp.start('concat-plugins-libs-and-modules-lint-modules-js');
        }); 
    }

    // Watcher for js-files of plugins
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/js/plugins/**/*.js', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('concat-plugins-libs-and-modules-lint-modules-js');
    });

    // Watcher for js-files of libs
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/js/libs/**/*.js', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('concat-plugins-libs-and-modules-lint-modules-js');
    });

    // Watcher for images in assets dir of modules
    watchByPattern('./markup/modules/**/assets/**/*.*', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-assets');
    });

    // Watcher for content images
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content/**/*.*', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-content-img');
    });

    // Watcher for images of plugins
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins/**/*.*', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-plugins-img');
    });

    // Watcher for misc files
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/misc/**/*.*', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('move-misc-files');
    });

    // Watcher for font files.
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/fonts/**/*.*', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('fonts-actions');
    });

    // Watcher for separate Js files files
    watchByPattern('./markup/' + projectConfig.fs.staticFolderName + '/js/separateJs/**/*.js', false, function(filename) {
        fileChangedNotify(filename);
        gulp.start('copy-separate-js');
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
        ['make-sprite-for-svg-fallback', 'make-sprite'],
        ['compile-css', 'compile-css-for-ie8', 'compile-css-for-ie9'],
        [
            'copy-separate-js', 'concat-plugins-libs-and-modules-lint-modules-js', 'compile-templates',
            'move-misc-files', 'move-assets', 'move-content-img', 'move-plugins-img', 'move-fonts'
        ],
        'generate-fonts',
        cb
    );
});

// Build release version
// Also you can add your own tasks in queue of build task

gulp.task('build', function(cb) {
    runSequence(
        'build-dev',
        'svg-minification',
        'pre-build',
        'svg-to-base64',
        ['compress-main-js', 'compress-css'],
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
        notify: browserSyncConfig.useNotifyInBrowser
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
        'make-sprite-for-svg-fallback',
        cb
    );
});

gulp.task('fonts-actions', function(cb) {
    runSequence(
        'move-fonts',
        'generate-fonts',
        cb
    );
});

/*********************/
/* END HELPERS TASKS */
/*********************/