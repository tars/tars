var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:minify-raster-img', function(cb) {
        return gulp.src('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/**/*.{png, jpg}')
            .pipe(changed('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/'))
            .pipe(imagemin())
            .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying raster images.\nLook in the console for details.\n' + error;
                })
            )
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/'))
            .pipe(
                notifier('Rastered images\'ve been minified')
            );
    });
};