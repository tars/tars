'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Copy separate Js-files to dev directory
 */
module.exports = function () {
    return gulp.task('js:move-separate', function (cb) {
        gulp.src('./markup/' + tars.config.fs.staticFolderName + '/js/separate-js/**/*.js')
            .pipe(cache('separate-js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving separate js-files.\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/js/separate-js'))
            .pipe(
                notifier('Separate js files\'s been copied')
            );

        cb(null);
    });
};
