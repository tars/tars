'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var htmlMin = tars.packages.htmlMin;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

var opts = {
    conditionals: true,
    quotes: true,
    empty: true
};

/**
 * Minify HTML (optional task)
 */
module.exports = function () {
    return gulp.task('html:minify-html', function (cb) {

        if (tars.config.minifyHtml) {
            return gulp.src('./dev/**/*.html')
                .pipe(htmlMin(opts))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifing html-files.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    notifier('Html \'ve been minified')
                );
        } else {
            gutil.log('!Html-minify disabled!');
            cb(null);
        }
    });
};
