var gulp = require('gulp'),
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    browserSync = require('browser-sync');

// Move images for content
module.exports = function(cb) {

    return gulp.task('move-content-img', function(cb) {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content/**/*.*')
            .pipe(cache('move-content-img'))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Content images\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};   