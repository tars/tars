'use strict';

var gulp = tars.packages.gulp;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move misc files
 */
module.exports = function () {
    return gulp.task('other:move-misc-files', function (cb) {
        return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/misc/**/*.*')
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving misc-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Misc files\'ve been moved')
            );
    });
};
