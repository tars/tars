var gulp = require('gulp'),                                     // Gulp JS
    path = require('path'),                                     // Path module
    rename = require('gulp-rename'),                            // File rename
    cache = require('gulp-cached'),                             // Gulp cache module
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Move images from assets modules of modules
module.exports = function(cb) {

    gulp.src('./markup/modules/**/assets/*.*')
        .pipe(cache('move-assets'))
        .pipe(rename(function(path) {
            path.dirname = '';
        }))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./dev/static/img/assets'))
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
};   