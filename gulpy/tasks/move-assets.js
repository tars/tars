var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    browserSync = require('browser-sync');

// Move images from assets modules of modules
module.exports = function(cb) {

    return gulp.task('move-assets', function(cb) {
        gulp.src('./markup/modules/**/assets/**/*.*')
            .pipe(cache('move-assets'))
            .pipe(rename(function(path) {
                path.dirname = path.dirname.match(/[a-zA-Z0-9]+\//)[0];
            }))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/assets/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Assets\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        cb(null);
    });
};   