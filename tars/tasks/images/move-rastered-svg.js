var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');

/**
 * Move images for content
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:move-rastered-svg', function(cb) {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/rastered-svg-images/*.png')
            .pipe(cache('move-rastered-svg'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving rastered svg images.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/rastered-svg-images'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Rastered svg images\'ve been moved')
            );
    });
};