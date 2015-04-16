var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');

/**
 * Move images for plugins
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('images:move-plugins-img', function (cb) {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/plugins/**/*.*')
            .pipe(cache('move-plugins-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving plugin\'s imgs.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/plugins'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Plugins\' images\'ve been moved')
            );
    });
};