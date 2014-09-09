var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    rename = require('gulp-rename'),
    cache = require('gulp-cached'),                             // Gulp cache module
    path = require('path'),
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Move svg to dev directory
module.exports = function() {

    return gulp.task('move-svg', function() {

        if (projectConfig.useSVG) {

            return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('move-svg'))
                .pipe(rename(function(path) {
                    path.dirname = '';
                }))
                .on('error', notify.onError(function (error) {
                    return 'Something is wrong.\nLook in console.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg'))
                .pipe(
                    gulpif(notifyConfig.useNotify, 
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'Svg\'ve been moved to dev\n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );

        } else {
            gutil.log('!SVG is not used!');
        }
    });  
};   