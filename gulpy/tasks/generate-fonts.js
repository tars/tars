var gulp = require('gulp'),                                     // Gulp JS
    gutil = require('gulp-util'),                               // Gulp util module
    exec = require('gulp-exec'),                                  // Run bash-scripts from gulp
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
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