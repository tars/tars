'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var cache = tars.packages.cache;
var jshint = tars.packages.jshint;
var jscs = tars.packages.jscs;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/data/data.js',
                     tars.config.lintJsCodeBeforeModules ? tars.config.jsPathsToConcatBeforeModulesJs : [],
                     tars.config.lintJsCodeAfterModules ? tars.config.jsPathsToConcatAfterModulesJs : []
                    ];

jsPathsToLint = [].concat.apply([], jsPathsToLint);

/**
 * Check JS for style and errors (optional task)
 */
module.exports = function () {
    return gulp.task('js:check', function (cb) {
        if (tars.config.useJsLintAndHint) {
            return gulp.src(jsPathsToLint)
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while checking js.');
                    }
                }))
                .pipe(cache('hinting'))
                .pipe(jshint({
                    esnext: true
                }))
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jscs())
                .pipe(jscs.reporter())
                .pipe(jscs.reporter('failImmediately'))
        } else {
            gutil.log('!JS-style-check and hinting is not used!');
            cb(null);
        }
    });
};
