'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var gulpif = tars.packages.gulpif;
var minify = tars.packages.htmlMin;
var prettify = tars.packages.htmlPrettify;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var minifyOpts = {
    conditionals: true,
    quotes: true,
    empty: true
};

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 4,
    indent_inner_html: true,
    preserve_newlines: true,
    max_preserve_newlines: 0,
    unformatted: true,
    end_with_newline: true,
    condensed: true,
    padcomments: false
};

/**
 * Minify HTML (optional task)
 */
module.exports = function () {
    return gulp.task('html:minify-html', function () {
        return gulp.src('./dev/**/*.html')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while processing compiled html-files.', error);
                    }
                }))
                .pipe(gulpif(tars.config.minifyHtml, minify(minifyOpts), prettify(prettifyOpts)))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    notifier.success('Compiled html\'ve been processed.')
                );
    });
};
