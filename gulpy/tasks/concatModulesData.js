// This is example of task function

var gulp = require('gulp'),                                     // Gulp JS
    concat = require('gulp-concat'),                            // Files concat
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Task description
module.exports = function(cb) {

    return gulp.task('concat-modules-data', function(cb) {
        return gulp.src('./markup/modules/**/mData.js')
            .pipe(concat('modulesData.js', {newLine: ',\n\n'}))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
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