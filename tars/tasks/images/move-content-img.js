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
    return gulp.task('images:move-content-img', function () {
        return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/content/**/*.*')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving content images.', error);
                }
            }))
            .pipe(cache('move-content-img'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/content'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Content images\'ve been moved')
            );
    });
};
