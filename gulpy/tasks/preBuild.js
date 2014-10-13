var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    gutil = require('gulp-util'),                               // Gulp util module
    fs = require('fs'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Copy files from dev to build directory
// Create build directory with new build version
module.exports = function(buildOptions) {

    return gulp.task('pre-build', function() {

        gutil.log('Build version is: ', buildOptions.buildVersion);

        return gulp.src(['./dev/**/*.*', '!./dev/temp/**'], { base: './dev/' })
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Pre-build task is finished\n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};   