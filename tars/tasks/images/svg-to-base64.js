var gulp = require('gulp');
var base64 = require('gulp-base64');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Convert included svg-files to base64 in css
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('svg-to-base64', function(cb) {

        if (tarsConfig.useSVG) {
            return gulp.src([buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/main' + buildOptions.hash + '.css', buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/main_ie9' + buildOptions.hash + '.css'])
                .pipe(base64({
                    extensions: ['svg']
                }))
                .on('error', notify.onError(function (error) {
                return '\nAn error occurred while converting svg to base64.\nLook in the console for details.\n' + error;
            }))
                .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/css/'))
                .pipe(
                    gulpif(notifyConfig.useNotify,
                        notify({
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'SVG includes\'ve been converted to base64 \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
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