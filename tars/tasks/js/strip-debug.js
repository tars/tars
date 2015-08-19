'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var stripDebug = tars.packages.stripDebug;
var tarsConfig = tars.config;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

var buildOptions = tars.options.build;

/**
 * Strip console.log and debugger from main.js (optional task)
 */
module.exports = function () {
    return gulp.task('js:strip-debug', function (cb) {

        if (tarsConfig.removeConsoleLog) {
            return gulp.src(buildOptions.path + tarsConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
                .pipe(stripDebug())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while stripping debug.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(buildOptions.path + tarsConfig.fs.staticFolderName + '/js/'))
                .pipe(
                    notifier('JS is ready for minify')
                );
        } else {
            gutil.log('!Strip debug is not used!');
            cb(null);
        }
    });
};
