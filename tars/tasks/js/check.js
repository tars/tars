'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var cache = tars.packages.cache;
var jshint = tars.packages.jshint;
var jscs = tars.packages.jscs;
var tarsConfig = tars.config;
var notify = tars.packages.notify;

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/data/data.js'
                    ];

if (tarsConfig.lintJsCodeBeforeModules) {
    jsPathsToLint = jsPathsToLint.concat(tarsConfig.jsPathsToConcatBeforeModulesJs);
}

if (tarsConfig.lintJsCodeAfterModules) {
    jsPathsToLint = jsPathsToLint.concat(tarsConfig.lintJsCodeAfterModules);
}

/**
 * Check JS for style and errors (optional task)
 */
module.exports = function () {
    return gulp.task('js:check', function (cb) {
        if (tarsConfig.useJsLintAndHint) {
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
