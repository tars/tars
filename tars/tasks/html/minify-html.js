var gulp = require('gulp');
var HtmlMin = require('gulp-minify-html');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * Minify HTML (optional task)
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
    var opts = {
        conditionals: true,
        quotes: true,
        empty: true
    };

    return gulp.task('html:minify-html', function (cb) {

        if (tarsConfig.minifyHtml) {
            return gulp.src('./dev/**/*.html')
                .pipe(HtmlMin(opts))
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