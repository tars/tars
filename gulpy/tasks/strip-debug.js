var gulp = require('gulp'),
    stripDebug = require('gulp-strip-debug'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Strip console.log and debugger from main.js
module.exports = function(buildOptions) {
    
    return gulp.task('strip-debug', function(buildOptions) {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/static/js/main' + buildOptions.hash + '.js')
            .pipe(stripDebug())
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while stripping debug.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/static/js/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'JS is ready for minify \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};   