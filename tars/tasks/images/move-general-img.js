'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var tarsConfig = tars.config;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move general images
 */
module.exports = function () {
    return gulp.task('images:move-general-img', function () {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/general/**/*.*')
            .pipe(cache('move-general-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving general images.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/general'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('General images\'ve been moved')
            );
    });
};
