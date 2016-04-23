'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

/**
 * Move misc files
 */
module.exports = () => {
    return gulp.task('other:move-misc-files', () => {
        return gulp.src(`./markup/${tars.config.fs.staticFolderName}/misc/**/*.*`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving misc-files.', error);
                }
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Misc files\'ve been moved')
            );
    });
};
