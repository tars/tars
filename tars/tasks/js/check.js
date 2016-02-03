'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const jsPathesToLint = [].concat.apply([], [
    './markup/modules/**/*.js',
    '!./markup/modules/**/_*.js',
    '!./markup/modules/**/data/data.js',
    tars.config.lintJsCodeBeforeModules ? tars.config.jsPathsToConcatBeforeModulesJs : [],
    tars.config.lintJsCodeAfterModules ? tars.config.jsPathsToConcatAfterModulesJs : []
]);

/**
 * Check JS for style and errors (optional task)
 */
module.exports = () => {
    return gulp.task('js:check', cb => {

        if (tars.config.useJsLintAndHint) {
            const eslint = tars.require('gulp-eslint');

            return gulp.src(jsPathesToLint)
                .pipe(plumber({
                    errorHandler() {
                        notifier.error('An error occurred while checking js.');
                    }
                }))
                .pipe(cache('eslint'))
                .pipe(eslint())
                .pipe(eslint.formatEach())
                .pipe(eslint.failAfterError());
        }

        tars.skipTaskLog('js:check', 'JavaScript check is not used');
        cb(null);
    });
};
