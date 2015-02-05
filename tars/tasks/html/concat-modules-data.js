var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modify-date-formatter');

/**
 * conact data for modules to one file
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('concat-modules-data', function(cb) {
        return gulp.src('./markup/modules/**/mData.js')
            .pipe(concat('modulesData.js', {newLine: ',\n\n'}))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while concating module\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Data for modules ready \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};