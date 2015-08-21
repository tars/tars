'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move images for plugins
 */
module.exports = function () {
    return gulp.task('images:move-plugins-img', function () {
        return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/plugins/**/*.*')
            .pipe(cache('move-plugins-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving plugin\'s imgs.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/plugins'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Plugins\' images\'ve been moved')
            );
    });
};
