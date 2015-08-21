'use strict';

var gulp = tars.packages.gulp;
var csso = tars.packages.csso;
var rename = tars.packages.rename;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Compress css-files
 */
module.exports = function () {
    return gulp.task('css:compress-css', function () {
        return gulp.src(tars.options.build.path + tars.config.fs.staticFolderName + '/css/*.css')
            .pipe(csso())
            .pipe(rename({
                suffix: '.min'
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing css.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(tars.options.build.path + tars.config.fs.staticFolderName + '/css/'))
            .pipe(
                notifier('Css\'ve been minified')
            );
    });
};
