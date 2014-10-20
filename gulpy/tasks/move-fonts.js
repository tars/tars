var gulp = require('gulp'),
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    browserSync = require('browser-sync');

// Move fonts-files to dev directory
module.exports = function() {

    return gulp.task('move-fonts', function() {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/fonts/**/*.*')
            .pipe(cache('move-fonts'))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/fonts'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Fonts\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};   