var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var cache = require('gulp-cached');
var tarsConfig = require('../../../tars-сonfig');
var notifyConfig = tarsConfig.notifyConfig;
var svg2png = require('gulp-svg2png');
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Raster SVG-files (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('raster-svg', function(cb) {

        if (tarsConfig.useSVG && gutil.env.ie8) {
            return gulp.src('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('raster-svg'))
                .pipe(svg2png())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while rastering svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/rasterSvgImages/'))
                .pipe(
                    gulpif(notifyConfig.useNotify,
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'SVG\'ve been rastered \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};