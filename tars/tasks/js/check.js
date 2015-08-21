'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var cache = tars.packages.cache;
var jshint = tars.packages.jshint;
var jscs = tars.packages.jscs;
var notify = tars.packages.notify;

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/data/data.js'
                    ];

if (tars.config.lintJsCodeBeforeModules) {
    jsPathsToLint = jsPathsToLint.concat(tars.config.jsPathsToConcatBeforeModulesJs);
}

if (tars.config.lintJsCodeAfterModules) {
    jsPathsToLint = jsPathsToLint.concat(tars.config.lintJsCodeAfterModules);
}

/**
 * Check JS for style and errors (optional task)
 */
module.exports = function () {
    return gulp.task('js:check', function (cb) {
        if (tars.config.useJsLintAndHint) {
            return gulp.src(jsPathsToLint)
                .pipe(cache('hinting'))
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jscs())
                .on('error', notify.onError(function (error) {
                    return 'An error occurred while checking js.\nLook in the console for details.\n';
                }));
        } else {
            gutil.log('!JS-style-check and hinting is not used!');
            cb(null);
        }
    });
};
