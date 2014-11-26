var gulp = require('gulp');
var base64 = require('gulp-base64');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Convert included svg-files to base64 in css
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('svg-to-base64', function(cb) {

        if (projectConfig.useSVG) {
            return gulp.src(['./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/main.css', './builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/main_ie9.css'])
                .pipe(base64({
                    extensions: ['svg']
                }))
                .on('error', notify.onError(function (error) {
                return '\nAn error occurred while converting svg to base64.\nLook in the console for details.\n' + error;
            }))
                .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/'))
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