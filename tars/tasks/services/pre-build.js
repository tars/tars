'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var gulpif = tars.packages.gulpif;
var fs = require('fs');
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Copy files from dev to build directory. Create build directory with new build version
 */
module.exports = function () {
    return gulp.task('service:pre-build', function () {
        return gulp.src(['./dev/**/*.*', '!./dev/temp/**'], { base: './dev/' })
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while running pre-build task.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(tars.options.build.path))
            .pipe(
                notifier('Pre-build task is finished')
            );
    });
};
