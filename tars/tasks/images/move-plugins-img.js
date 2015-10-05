'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Move images for plugins
 */
module.exports = function () {
    return gulp.task('images:move-plugins-img', function () {
        return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/plugins/**/*.*')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving plugin\'s imgs.', error);
                }
            }))
            .pipe(cache('move-plugins-img'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/plugins'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Plugins\' images\'ve been moved')
            );
    });
};
