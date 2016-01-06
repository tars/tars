'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

var jsPathesToLint = [
    './markup/modules/**/*.js',
    '!./markup/modules/**/_*.js',
    '!./markup/modules/**/data/data.js',
    tars.config.lintJsCodeBeforeModules ? tars.config.jsPathsToConcatBeforeModulesJs : [],
    tars.config.lintJsCodeAfterModules ? tars.config.jsPathsToConcatAfterModulesJs : []
];

jsPathesToLint = [].concat.apply([], jsPathesToLint);

/**
 * Check JS for style and errors (optional task)
 */
module.exports = function () {
    return gulp.task('js:check', function (cb) {

        if (tars.config.useJsLintAndHint) {
            const eslint = tars.require('gulp-eslint');

            return gulp.src(jsPathesToLint)
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
            tars.skipTaskLog('js:check', 'JavaScript check is not used');
            cb(null);
        }
    });
};
