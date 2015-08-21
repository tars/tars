'use strict';

var gulp = tars.packages.gulp;
var uglify = tars.packages.uglify;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

var buildOptions = tars.options.build;

require('./strip-debug')();

/**
 * Compress js-files
 */
module.exports = function () {
    return gulp.task('js:compress', ['js:strip-debug'], function () {
        return gulp.src(buildOptions.path + tars.config.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
            .pipe(uglify('main' + buildOptions.hash + '.min.js', {
                mangle: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing js.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(buildOptions.path + tars.config.fs.staticFolderName + '/js/'))
            .pipe(
                notifier('JS\'ve been minified')
            );
    });
};
