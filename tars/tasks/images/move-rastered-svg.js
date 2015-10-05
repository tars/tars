'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Move images for content
 */
module.exports = function () {
    return gulp.task('images:move-rastered-svg', function () {
        return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images/*.png')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving rastered svg images.', error);
                }
            }))
            .pipe(cache('move-rastered-svg'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Rastered svg images\'ve been moved')
            );
    });
};
