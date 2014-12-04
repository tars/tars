// This is example of task function

var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');
    // Include browserSync, if you need to reload browser
    // var browserSync = require('browser-sync');

// require('./ path to task file, which have to be done before current task');

/**
 * Task description
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('task-name', ['required-task-name'], function(cb) {
        return gulp.src(/* path-string or array of path-strings to files */)
            // Do stuff here
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while something.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(/* path-string to destination directory. Only directory, not a file! */))

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