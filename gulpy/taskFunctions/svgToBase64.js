var gulp = require('gulp'),                                     // Gulp JS
    base64 = require('gulp-base64'),
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    gutil = require('gulp-util'),                               // Gulp util module
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator');

// Convert included svg files to base64 in css
module.exports = function() {
    
    if (projectConfig.useSVG) {

        return gulp.src(['./builds/build' + buildVersionGenerator.newBuildVersion + '/static/css/main.css', './builds/build' + buildVersionGenerator.newBuildVersion + '/static/css/main_ie9.css'])
            .pipe(base64({
                extensions: ['svg']
            }))
            .on('error', notify.onError(function (error) {
                return notifyConfig.errorMessage(error);
            }))
            .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/css/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'SVG\'ve been converted to base64 \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    } else {
        gutil.log('!SVG is not used!');
    }
};   