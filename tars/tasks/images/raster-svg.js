var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var changed = require('gulp-changed');
var cache = require('gulp-cached');
var tarsConfig = require('../../../tars-config');
var svg2png = require('gulp-svg2png');

/**
 * Raster SVG-files (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:raster-svg', function(cb) {

        if (tarsConfig.useSVG && gutil.env.ie8) {
            return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('raster-svg'))
                .pipe(
                    changed(
                        'dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/rastered-svg-images',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.png'
                        }
                    )
                )
                .pipe(svg2png())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while rastering svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/rastered-svg-images'))
                .pipe(
                    notifier('SVG\'ve been rastered')
                );
        } else {
            gutil.log('!Rastering SVG is not used!');
            cb(null);
        }
    });
};