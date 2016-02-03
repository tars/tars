'use strict';

const gulp = tars.packages.gulp;
const concat = tars.packages.concat;
const streamCombiner = tars.packages.streamCombiner;
const plumber = tars.packages.plumber;
const gulpif = tars.packages.gulpif;
const rename = tars.packages.rename;
const sourcemaps = tars.packages.sourcemaps;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const cwd = process.cwd();
const path = require('path');

const staticFolderName = tars.config.fs.staticFolderName;
const destFolder = './dev/' + staticFolderName + '/js';
const compressJs = tars.flags.release || tars.flags.min;
const generateSourceMaps = tars.config.sourcemaps.js.active && tars.isDevMode;
const sourceMapsDest = tars.config.sourcemaps.js.inline ? '' : '.';
const jsPaths = [].concat.apply([], [
    '!./markup/modules/**/data/data.js',
    './markup/' + staticFolderName + '/js/framework/**/*.js',
    './markup/' + staticFolderName + '/js/libraries/**/*.js',
    './markup/' + staticFolderName + '/js/plugins/**/*.js',
    tars.config.jsPathsToConcatBeforeModulesJs,
    './markup/modules/*/*.js',
    tars.config.jsPathsToConcatAfterModulesJs,
    '!./markup/' + staticFolderName + '/js/separate-js/**/*.js'
]);

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
function base() {
    return streamCombiner(
        gulpif(tars.config.useBabel, tars.require('gulp-babel')({
            babelrc: path.resolve(cwd + '/.babelrc')
        })),
        concat({cwd: cwd, path: 'main.js'}),
        rename({ suffix: tars.options.build.hash }),
        gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)),
        gulp.dest(destFolder)
    );
}

/**
 * Stream of minimized with JavaScript.
 * ------------------------------------
 * There are:
 *  - removing `console.log()` and `debug`;
 *  - uglified code;
 *  - add '.min' suffix for main file;
 *  - write source maps;
 *  - write main file at fs.
 */
function compress() {
    return streamCombiner(
        gulpif(tars.config.removeConsoleLog, tars.require('gulp-strip-debug')()),
        tars.require('gulp-uglify')({ mangle: false }),
        rename({ suffix: '.min' }),
        gulp.dest(destFolder)
    );
}

module.exports = () => {
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
    return gulp.task('js:processing', ['js:check'], () => {
        return gulp.src(jsPaths, { base: cwd })
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while processing js-files.', error);
                }
            }))
            .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
            .pipe(base())
            .pipe(gulpif(compressJs, compress(destFolder)))
            .pipe(notifier.success('JavaScript has been processed'))
            .pipe(browserSync.reload({ stream: true }));
    });
};
