'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move fonts-files to dev directory
 */
module.exports = function () {
    return gulp.task('other:move-fonts', function () {
        return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/fonts/**/*.*')
            .pipe(cache('move-fonts'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving fonts.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/fonts'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Fonts\'ve been moved')
            );
    });
};
