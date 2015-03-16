var gulp = require('gulp');
var base64 = require('gulp-base64');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * Convert included svg-files to base64 in css
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:svg-to-base64', function(cb) {

        if (tarsConfig.useSVG) {
            return gulp.src([
                    buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/main' + buildOptions.hash + '.css',
                    buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/main_ie9' + buildOptions.hash + '.css'
                ])
                .pipe(base64({
                    extensions: ['svg']
                }))
                .on('error', notify.onError(function (error) {
                return '\nAn error occurred while converting svg to base64.\nLook in the console for details.\n' + error;
            }))
                .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/'))
                .pipe(
                    notifier('SVG includes\'ve been converted to base64')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};