var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    cache = require('gulp-cached'),                             // Gulp cache module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Copy separate Js to dev directory
module.exports = function() {

    return gulp.task('copy-separate-js', function(cb) {
        gulp.src('./markup/static/js/separateJs/**/*.js')
            .pipe(cache('separate-js'))
            .pipe(gulp.dest('./dev/static/js/separateJs'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Separate js files\'s been copied \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        cb(null);
    });  
};   