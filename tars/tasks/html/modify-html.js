'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const usersModifyOptions = require(tars.root + '/user-tasks/html/helpers/modify-options');

const minifyOpts = Object.assign({
    conditionals: true,
    quotes: true,
    empty: true
}, usersModifyOptions.minifyOpts);

/* eslint-disable camelcase */

const prettifyOpts = Object.assign({
    indent_char: ' ',
    indent_size: 4,
    indent_inner_html: true
}, usersModifyOptions.prettifyOpts);

/* eslint-enable camelcase */

/**
 * Minify HTML (optional task)
 */
module.exports = () => {
    return gulp.task('html:modify-html', () => {
        return gulp.src('./dev/**/*.html')
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while processing compiled html-files.', error);
                }
            }))
            .pipe(gulpif(
                tars.config.minifyHtml,
                tars.require('gulp-minify-html')(minifyOpts),
                tars.require('gulp-html-prettify')(prettifyOpts)
            ))
            .pipe(gulp.dest('./dev/'))
            .pipe(
                notifier.success('Compiled html\'ve been processed.')
            );
    });
};
