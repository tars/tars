// This is example of task function

var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify
    // Include browserSync, if you need to reload browser
    // browserSync = require('browser-sync');                   // Plugin for sync with browser

// require('./ path to task file, which have to be done before current task');

// Task description
module.exports = function(cb) {

    return gulp.task(/* task name, String in quotes */, [/* tasks names, which have to be done before current task */], function(cb) {
        return gulp.src(/* path-string or array of path-strings to files */)
            // Do stuff here
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest(/* path-string to destanation directory. Only directory, not a file! */))

            // If you need to reload browser, uncomment the row below
            // .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true, // Use this, if you need notify only after last file will be processed
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        // You can change text of success message
                        message: 'Example task is finished \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        // You can return callback, if you can't return pipe
        // cb(null);
    });
};   