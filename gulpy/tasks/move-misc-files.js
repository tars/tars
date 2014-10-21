var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    browserSync = require('browser-sync');

// Move misc files
module.exports = function(cb) {

    return gulp.task('move-misc-files', function(cb) {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/misc/**/*.*')
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
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