var gulp = require('gulp'),
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    browserSync = require('browser-sync');

// Move images for plugins
module.exports = function(cb) {

    return gulp.task('move-plugins-img', function(cb) {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins/**/*.*')
            .pipe(cache('move-plugins-img'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving plugin\'s imgs.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Plugins\' images\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    }); 
};   