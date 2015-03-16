var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var path = require('path');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * Move svg to dev directory (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:move-svg', function(cb) {

        if (tarsConfig.useSVG) {
            return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('move-svg'))
                .pipe(rename(function(path) {
                    path.dirname = '';
                }))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while moving svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg'))
                .pipe(
                    notifier('Svg\'ve been moved to dev')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};