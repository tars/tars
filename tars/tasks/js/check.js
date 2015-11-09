'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var eslint = tars.packages.eslint;
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
                    errorHandler: function () {
                        notifier.error('An error occurred while checking js.');
                    }
                }))
                .pipe(cache('eslint'))
                .pipe(eslint())
                .pipe(eslint.formatEach())
                .pipe(eslint.failAfterError());
        } else {
            tars.skipTaskLog('js:check', 'JavaScript style-check and hinting is not used');
            cb(null);
        }
    });
};
