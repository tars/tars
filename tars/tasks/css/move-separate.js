'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var staticFolderName = tars.config.fs.staticFolderName;

/**
 * Copy separate Css-files to dev directory
 */
module.exports = function () {
    return gulp.task('css:move-separate', function (cb) {
        gulp.src('./markup/' + staticFolderName + '/' + tars.cssPreproc.name + '/separate-css/**/*.css')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving separate css-files.', error);
                }
            }))
            .pipe(cache('separate-css'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/css/separate-css'))
            .pipe(
                notifier.success('Separate css files\'s been copied')
            );

        cb(null);
    });
};
