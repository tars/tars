'use strict';

const gulp = tars.packages.gulp;
const rename = tars.packages.rename;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

/**
 * Compress css-files
 */
module.exports = () => {
    return gulp.task('css:compress-css', () => {
        return gulp.src(`${tars.options.build.path}${tars.config.fs.staticFolderName}/css/*.css`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while compressing css.', error);
                }
            }))
            .pipe(tars.require('gulp-csso')(tars.pluginsConfig['gulp-csso']))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(`${tars.options.build.path}${tars.config.fs.staticFolderName}/css/`))
            .pipe(
                notifier.success('Css\'ve been minified')
            );
    });
};
