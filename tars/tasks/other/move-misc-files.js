'use strict';

var gulp = tars.packages.gulp;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move misc files
 */
module.exports = function () {
    return gulp.task('other:move-misc-files', function (cb) {
        return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/misc/**/*.*')
            .pipe(plumber({
                errorHandler: function (error) {
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
