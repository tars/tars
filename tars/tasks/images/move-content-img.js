'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var tarsConfig = tars.config;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move images for content
 */
module.exports = function () {
    return gulp.task('images:move-content-img', function () {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/content/**/*.*')
            .pipe(cache('move-content-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving content images.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/content'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Content images\'ve been moved')
            );
    });
};
