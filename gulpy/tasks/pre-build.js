var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var fs = require('fs');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');

/**
 * Copy files from dev to build directory. Create build directory with new build version
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('pre-build', function() {

        if (projectConfig.useBuildVersioning) {
            console.log('\n----------------------------------------------------------------------');
            gutil.log(gutil.colors.magenta.bold('Build version is: ', buildOptions.buildVersion));
            console.log('----------------------------------------------------------------------\n');
        }

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