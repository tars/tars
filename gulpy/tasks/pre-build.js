var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Copy files from dev to build directory
// Create build directory with new build version
module.exports = function(buildOptions) {

    return gulp.task('pre-build', function() {

        gutil.log('Build version is: ', buildOptions.buildVersion);

        return gulp.src(['./dev/**/*.*', '!./dev/temp/**'], { base: './dev/' })
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while running pre-build task.\nLook in the console for details.\n' + error;
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