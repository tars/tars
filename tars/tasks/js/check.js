'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const jsPathesToLint = [].concat.apply([], [
    `./markup/${tars.config.fs.componentsFolderName}/**/*.js`,
    `!./markup/${tars.config.fs.componentsFolderName}/**/_*.js`,
    `!./markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
    tars.config.js.lintJsCodeBeforeModules ? tars.config.js.jsPathsToConcatBeforeModulesJs : [],
    tars.config.js.lintJsCodeAfterModules ? tars.config.js.jsPathsToConcatAfterModulesJs : []
]);

/**
 * Check JS for style and errors (optional task)
 */
module.exports = () => {
    return gulp.task('js:check', done => {

        /* eslint-disable no-case-declarations */
        if (tars.config.js.lint) {
            switch (tars.config.js.workflow) {
                case 'modular':
                    switch (tars.config.js.bundler) {
                        case 'webpack':
                        default:
                            tars.skipTaskLog('js:check', 'Code will be linted by built-in linter in bundler');
                            return done(null);
                    }
                case 'concat':
                default:
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
        }
        /* eslint-enable no-case-declarations */

        tars.skipTaskLog('js:check', 'JavaScript check is not used');
        done(null);
    });
};
