'use strict';

var gulp = tars.packages.gulp;
var concat = tars.packages.concat;
var Combine = tars.packages.streamCombiner;
var uglify = tars.packages.uglify;
var plumber = tars.packages.plumber;
var gulpif = tars.packages.gulpif;
var rename = tars.packages.rename;
var stripDebug = tars.packages.stripDebug;
var sourcemaps = tars.packages.sourcemaps;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;
var destFolder = './dev/' + staticFolderName + '/js';
var compressJs = tars.flags.release || tars.flags.min;
var generateSourceMaps = tars.config.sourcemaps.js && !tars.flags.release;
var jsPaths = [
        '!./markup/modules/**/data/data.js',
        './markup/' + staticFolderName + '/js/framework/**/*.js',
        './markup/' + staticFolderName + '/js/libraries/**/*.js',
        './markup/' + staticFolderName + '/js/plugins/**/*.js',
        tars.config.jsPathsToConcatBeforeModulesJs,
        './markup/modules/*/*.js',
        tars.config.jsPathsToConcatAfterModulesJs
    ];

jsPaths = [].concat.apply([], jsPaths);

/**
 * Stream of base processing with JavaScript.
 * ------------------------------------------
 * There are:
 *  - concat js files;
 *  - add hash like a suffix of filename;
 *  - write header in the start of main file;
 *  - write footer in the end of main file;
 *  - write source map;
 *  - write main file at fs.
 */
function base () {
    return Combine(
        concat('main.js'),
        rename({ suffix: tars.options.build.hash }),
        gulpif(generateSourceMaps, sourcemaps.write()),
        gulp.dest(destFolder)
    ).on('error', notify.onError(function (error) {
        return 'An error occurred while base processing js-files.\
                \nLook in the console for details.\
                \n' + error;
        })
    );
}

/**
 * Stream of minimized with JavaScript.
 * ------------------------------------
 * There are:
 *  - removing `condole.log()` and `debug`;
 *  - uglified code;
 *  - add '.min' suffix for main file;
 *  - write source maps;
 *  - write main file at fs.
 */
function compress () {
    return Combine(
        gulpif(tars.config.removeConsoleLog, stripDebug()),
        uglify({ mangle: false }),
        rename({ suffix: '.min' }),
        gulpif(generateSourceMaps, sourcemaps.write()),
        gulp.dest(destFolder)
    ).on('error', notify.onError(function (error) {
        return 'An error occurred while compressing js.\
                \nLook in the console for details.\
                \n' + error;
        })
    );
}

module.exports = function () {
    /**
     * Task for processing with JavaScript files.
     * ------------------------------------------
     * There are:
     *  - call lint task;
     *  - prevent pipe breaking;
     *  - creation of stream;
     *  - init source maps;
     *  - base processing;
     *  - compress code;
     *  - notify about end of task;
     *  - reloading browser's page.
     */
    return gulp.task('js:processing', ['js:check'], function () {
        return gulp.src(jsPaths, { base: process.cwd() })
            .pipe(plumber())
            .pipe(gulpif(tars.config.sourcemaps.js, sourcemaps.init()))
            .pipe(base())
            .pipe(gulpif(compressJs, compress(destFolder)))
            .pipe(notifier('JavaScript was processed'))
            .pipe(browserSync.reload({ stream: true }));
    });
};
