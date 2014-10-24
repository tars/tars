var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached'),
    path = require('path'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Move svg to dev directory
module.exports = function() {

    return gulp.task('move-svg', function(cb) {

        if (projectConfig.useSVG) {

            return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('move-svg'))
                .pipe(rename(function(path) {
                    path.dirname = '';
                }))
                .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving svg.\nLook in the console for details.\n' + error;
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

        cb(null);
    });  
};   