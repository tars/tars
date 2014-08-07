var gulp = require('gulp'),                                     // Gulp JS
    jade = require('gulp-jade'),                                // Jade compilation
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Jade compilation of pages templates.
// Templates with _ prefix won't be compiled
module.exports = function(cb) {

    gulp.src(['./markup/pages/*.jade', '!./markup/pages/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./dev/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Jade templates\'ve been compiled \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );

    cb(null);    
};   