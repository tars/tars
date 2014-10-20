var gulp = require('gulp'),
    gutil = require('gulp-util'),
    exec = require('gulp-exec'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    gf = gutil.env.gf;

// Generate font-files (eot, woff, svg) from .ttf-file
module.exports = function() {

    return gulp.task('generate-fonts', function() {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/fonts/')             
            .pipe(gulpif(gf, exec('webfonts "./markup/' + projectConfig.fs.staticFolderName + '/fonts/"')))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Fonts\'ve been generated \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};   