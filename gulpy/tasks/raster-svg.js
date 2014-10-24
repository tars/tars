var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    cache = require('gulp-cached'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    raster = require('gulp-raster'),
    rename = require('gulp-rename'),
    modifyDate = require('../helpers/modifyDateFormatter');

// Raster SVG-files
module.exports = function() {

    return gulp.task('raster-svg', function(cb) {
        if (projectConfig.useSVG && projectConfig.useIE8Stylies) {
            return gulp.src('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('raster-svg'))
                .pipe(raster())
                .pipe(rename({extname: '.png'}))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while rastering svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/rasterSvgImages/'))
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

        cb(null);
    });  
};   