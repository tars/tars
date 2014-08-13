var gulp = require('gulp'),                                     // Gulp JS
    concat = require('gulp-concat'),                            // Files concat
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Concat JS for modules, libs and plugins in common file.
// Also lint modules' js
module.exports = function() {

    return gulp.src(['./markup/static/js/libs/*.js', 
              './markup/static/js/libs/**/*.js', 
              './markup/static/js/plugins/*.js', 
              './markup/static/js/plugins/**/*.js', 
              './markup/modules/**/*.js'
            ])
        .pipe(concat('main.js'))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage;
        }))
        .pipe(gulp.dest('./dev/static/js'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'JS\'ve been linted and concatinated \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );  
};   