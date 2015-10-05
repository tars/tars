'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var imagemin = tars.packages.imagemin;
var changed = tars.packages.changed;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Minify png and jpg images
 */
module.exports = function () {
    return gulp.task('images:minify-raster-img', function (cb) {
        return gulp.src('./dev/' + staticFolderName + '/' + imagesFolderName + '/**/*.{png, jpg}')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while minifying raster images.', error);
                }
            }))
            .pipe(changed('./dev/' + staticFolderName + '/' + imagesFolderName + '/'))
            .pipe(imagemin())
            .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/'))
            .pipe(
                notifier.success('Rastered images\'ve been minified')
            );
    });
};
