var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig');
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    raster = require('gulp-raster'),
    rename = require('gulp-rename'),
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Raster SVG-files
module.exports = function() {

    if (projectConfig.useSVG) {

        return gulp.src('./dev/static/img/svg/*.svg')
            .pipe(raster())
            .pipe(rename({extname: '.png'}))
            .on('error', notify.onError(function (error) {
                return notifyConfig.errorMessage(error);
            }))
            .pipe(gulp.dest('./dev/static/img/rasterSvgImages/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'SVG\'ve been rastered \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
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