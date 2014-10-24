var gulp = require('gulp'),
    base64 = require('gulp-base64'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Convert included svg files to base64 in css
module.exports = function(buildOptions) {
    
    return gulp.task('svg-to-base64', function(cb) {
        if (projectConfig.useSVG) {
            return gulp.src(['./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/main.css', './builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/main_ie9.css'])
                .pipe(base64({
                    extensions: ['svg']
                }))
                .on('error', notify.onError(function (error) {
                return '\nAn error occurred while converting svg to base64.\nLook in the console for details.\n' + error;
            }))
                .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/'))
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

        cb(null);
    });
};   