var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Copy separate Js-files to dev directory
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('js:move-separate', function(cb) {
        gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/js/separate-js/**/*.js')
            .pipe(cache('separate-js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving separate js-files.\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/js/separate-js'))
            .pipe(
                notifier('Separate js files\'s been copied')
            );

        cb(null);
    });
};