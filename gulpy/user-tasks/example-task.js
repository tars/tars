// This is example of task function

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');
    // Include browserSync, if you need to reload browser
    // browserSync = require('browser-sync');

// require('./ path to task file, which have to be done before current task');

// Task description
module.exports = function(cb) {

    return gulp.task(/* task name, String in quotes */, [/* tasks names, which have to be done before current task */], function(cb) {
        return gulp.src(/* path-string or array of path-strings to files */)
            // Do stuff here
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while something.\nLook in the console for details.\n' + error;
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