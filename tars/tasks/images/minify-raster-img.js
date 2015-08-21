'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var imagemin = tars.packages.imagemin;
var changed = tars.packages.changed;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Minify png and jpg images
 */
module.exports = function () {
    return gulp.task('images:minify-raster-img', function (cb) {
        return gulp.src('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/**/*.{png, jpg}')
            .pipe(changed('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/'))
            .pipe(imagemin())
            .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying raster images.\nLook in the console for details.\n' + error;
                })
            )
            .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/'))
            .pipe(
                notifier('Rastered images\'ve been minified')
            );
    });
};
