'use strict';

var gulp = tars.packages.gulp;
var plumber = tars.packages.plumber;
var concat = tars.packages.concat;
var notifier = tars.helpers.notifier;

/**
 * conact data for modules to one file
 */
module.exports = function () {
    return gulp.task('html:concat-modules-data', function () {
        return gulp.src('./markup/modules/**/data/data.js')
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while concating module\'s data.', error);
                }
            }))
            .pipe(concat('modulesData.js', { newLine: ',\n\n' }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                notifier.success('Data for modules ready')
            );
    });
};
