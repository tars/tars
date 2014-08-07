var gulp = require('gulp'),                                     // Gulp JS
    gutil = require('gulp-util'),                               // Gulp util module
    run = require('gulp-run'),                                  // Run bash-scripts from gulp
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    gf = gutil.env.gf;

// Generate font-files (eot, woff, svg) from .ttf-file
module.exports = function() {

    return gulp.src('./markup/static/fonts/')             
        .pipe(gulpif(gf, run('webfonts "./dev/static/fonts/"')))
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
};   