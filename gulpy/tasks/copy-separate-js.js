var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    cache = require('gulp-cached'),
    notify = require('gulp-notify'),
    notifyConfig = require('../../projectConfig').notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Copy separate Js to dev directory
module.exports = function() {

    return gulp.task('copy-separate-js', function(cb) {
        gulp.src('./markup/static/js/separateJs/**/*.js')
            .pipe(cache('separate-js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving separate js-files.\'s data.\nLook in the console for details.\n' + error;
            }))
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