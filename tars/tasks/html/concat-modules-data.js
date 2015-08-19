'use strict';

var gulp = tars.packages.gulp;
var concat = tars.packages.concat;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * conact data for modules to one file
 */
module.exports = function () {
    return gulp.task('html:concat-modules-data', function (cb) {
        return gulp.src('./markup/modules/**/data/data.js')
            .pipe(concat('modulesData.js', { newLine: ',\n\n' }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while concating module\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                notifier('Data for modules ready')
            );
    });
};
