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

    return gulp.task('images:move-content-img', function(cb) {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/content/**/*.*')
            .pipe(cache('move-content-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving content images.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/content'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Content images\'ve been moved')
            );
    });
};