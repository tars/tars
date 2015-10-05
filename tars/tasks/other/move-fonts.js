'use strict';

var gulp = tars.packages.gulp;
var cache = tars.packages.cache;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;

/**
 * Move fonts-files to dev directory
 */
module.exports = function () {
    return gulp.task('other:move-fonts', function () {
        return gulp.src('./markup/' + staticFolderName + '/fonts/**/*.*')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while moving fonts.', error);
                }
            }))
            .pipe(cache('move-fonts'))
            .pipe(gulp.dest('./dev/' + staticFolderName + '/fonts'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Fonts\'ve been moved')
            );
    });
};
