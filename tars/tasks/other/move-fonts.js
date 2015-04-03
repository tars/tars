var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');
var browserSync = require('browser-sync');

/**
 * Move fonts-files to dev directory
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('other:move-fonts', function() {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/fonts/**/*.*')
            .pipe(cache('move-fonts'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving fonts.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/fonts'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Fonts\'ve been moved')
            );
    });
};