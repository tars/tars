var gulp = require('gulp');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var stripDebug = require('gulp-strip-debug');
var sourcemaps = require('gulp-sourcemaps');
var Combine = require('stream-combiner');
var browserSync = require('browser-sync');
var notifier = require('../../helpers/notifier');

var tarsConfig = require('../../../tars-config');
var staticFolder = tarsConfig.fs.staticFolderName;
var destFolder = './dev/' + staticFolder + '/js';
var jsPaths = [
        '!./markup/modules/**/data/data.js',
        './markup/' + staticFolder + '/js/framework/**/*.js',
        './markup/' + staticFolder + '/js/libraries/**/*.js',
        './markup/' + staticFolder + '/js/plugins/**/*.js',
        tarsConfig.jsPathsToConcatBeforeModulesJs,
        './markup/modules/*/*.js',
        tarsConfig.jsPathsToConcatAfterModulesJs
    ];

jsPaths = [].concat.apply([], jsPaths);

module.exports = function (options) {
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
            rename({ suffix: options.hash }),
            gulpif(options.generateSourceMaps.js, sourcemaps.write()),
            gulp.dest(destFolder)
        ).on('error', notify.onError(function (error) {
            return '\nAn error occurred while base processing js-files.\
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
            gulpif(tarsConfig.removeConsoleLog, stripDebug()),
            uglify({ mangle: false }),
            rename({ suffix: '.min' }),
            gulpif(options.generateSourceMaps.js, sourcemaps.write()),
            gulp.dest(destFolder)
        ).on('error', notify.onError(function (error) {
            return '\nAn error occurred while compressing js.\
                    \nLook in the console for details.\
                    \n' + error;
            })
        );
    }

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
        return gulp.src(jsPaths)
            .pipe(plumber())
            .pipe(gulpif(options.generateSourceMaps.js, sourcemaps.init()))
            .pipe(base())
            .pipe(gulpif(options.compressJs, compress(destFolder)))
            .pipe(notifier('JavaScript was processed'))
            .pipe(browserSync.reload({ stream: true }));
    });
};
