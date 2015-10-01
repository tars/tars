'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var htmlMin = tars.packages.htmlMin;
var plumber = tars.packages.plumber;
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
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while minifing html-files.', error);
                    }
                }))
                .pipe(htmlMin(opts))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    notifier.success('Html \'ve been minified')
                );
        } else {
            gutil.log('!Html-minify disabled!');
            cb(null);
        }
    });
};
