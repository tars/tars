'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var staticFolderName = tars.config.fs.staticFolderName;

/**
 * Copy separate Js-files to dev directory
 */
module.exports = function () {
    return gulp.task('js:move-separate', function (cb) {
        gulp.src('./markup/' + staticFolderName + '/js/separate-js/**/*.js')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving separate js-files.', error);
                }
            }))
            .pipe(cache('separate-js'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/js/separate-js'))
            .pipe(
                notifier.success('Separate js files\'s been copied')
            );

        cb(null);
    });
};
