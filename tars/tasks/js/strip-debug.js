var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Strip console.log and debugger from main.js (optional task)
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('js:strip-debug', function (cb) {

        if (tarsConfig.removeConsoleLog) {
            return gulp.src(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
                .pipe(stripDebug())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while stripping debug.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/'))
                .pipe(
                    notifier('JS is ready for minify')
                );
        } else {
            gutil.log('!Strip debug is not used!');
            cb(null);
        }
    });
};