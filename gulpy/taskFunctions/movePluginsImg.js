var gulp = require('gulp'),                                     // Gulp JS
    cache = require('gulp-cached'),                             // Gulp cache module
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Move images for plugins
module.exports = function(cb) {

    gulp.src(['./markup/static/images/plugins/*.*', './markup/static/images/plugins/**/*.*'])
        .pipe(cache('move-plugins-img'))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./dev/static/img/plugins'))
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

    cb(null);    
};   