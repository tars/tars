'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

const fontsFolderPath = `${tars.config.fs.staticFolderName}/fonts`;

/**
 * Move fonts-files to dev directory
 */
module.exports = () => {
    return gulp.task('other:move-fonts', () => {
        return gulp.src(`./markup/${fontsFolderPath}/**/*.*`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving fonts.', error);
                }
            }))
            .pipe(cache('move-fonts'))
            .pipe(gulp.dest(`${tars.config.devPath}${fontsFolderPath}`))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Fonts\'ve been moved')
            );
    });
};
