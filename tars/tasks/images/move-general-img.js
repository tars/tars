'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Move general images
 */
module.exports = function () {
    return gulp.task('images:move-general-img', function () {
        return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/general/**/*.*')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving general images.', error);
                }
            }))
            .pipe(cache('move-general-img'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/general'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('General images\'ve been moved')
            );
    });
};
