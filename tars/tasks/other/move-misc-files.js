var gulp = require('gulp');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');

/**
 * Move misc files
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('other:move-misc-files', function(cb) {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/misc/**/*.*')
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving misc-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Misc files\'ve been moved')
            );
    });
};