var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-сonfig');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');
var browserSync = require('browser-sync');

/**
 * Move misc files
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('move-misc-files', function(cb) {
        return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/misc/**/*.*')
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving misc-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Misc files\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};