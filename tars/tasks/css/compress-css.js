var gulp = require('gulp');
var csso = require('gulp-csso');
var cmq = require('gulp-combine-media-queries');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * Compress css-files
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('css:compress-css', function() {
        return gulp.src(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/*.css')
            // @TODO: fix problems with cmq
            // .pipe(cmq())
            .pipe(csso())
            .pipe(rename({
                suffix: '.min'
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing css.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/'))
            .pipe(
                notifier('Css\'ve been minified')
            );
        });
};