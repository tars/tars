'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;

/**
 * Output in the begining
 */
module.exports = function () {
    return gulp.task('service:builder-start-screen', function (cb) {

        if (!process.env.tarsVersion) {
            var i = 0;

            console.log('\n------------------------------------------------------------');
            console.log(gutil.colors.green.bold('Build have been started. You are using:\n'));

            if (tars.flags.release) {
                console.log(gutil.colors.black.bold('• release mode;'));
            }

            if (tars.flags.min) {
                console.log(gutil.colors.black.bold('• minify mode;'));
            }

            if (tars.flags.lr) {
                console.log(gutil.colors.black.bold('• livereload mode;'));
            }

            if (tars.flags.tunnel) {
                console.log(gutil.colors.black.bold('• tunnel mode;'));
            }

            if (tars.flags.ie8) {
                console.log(gutil.colors.black.bold('• ie8 maintenance;'));
            }

            for (var key in tars.flags) { i++; }

            if (i <= 1) {
                console.log(gutil.colors.black.bold('No modes.'));
            }

            console.log(gutil.colors.green.bold('\nHave a nice work.'));
            console.log(gutil.colors.green.bold('Let\'s go & create something awesome!'));

            console.log('------------------------------------------------------------\n');
        }

        cb();
    });
};
