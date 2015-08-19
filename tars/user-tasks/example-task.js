'use strict';

// This is example of task function

var gulp = tars.packges.gulp;
var tarsConfig = tars.config;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
// Include browserSync, if you need to reload browser
// var browserSync = tars.packages.browserSync;

// require('./ path to task file, which have to be done before current task');
// require('./required-task-name');

/**
 * Task description
 */
module.exports = function () {

    return gulp.task('task-name', /*['required-task-name'],*/ function (cb) {
        return gulp.src(/* path-string or array of path-strings to files */)
            // Do stuff here
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while something.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(/* path-string to destination directory. Only directory, not a file! */))

            // If you need to reload browser, uncomment the row below
            // .pipe(browserSync.reload({stream:true}))
            .pipe(
                // You can change text of success message
                notifier('Example task is finished')
                // if you need notify after each file will be processed, you have to use
                // notifier('Example task is finished', false)
            );

        // You can return callback, if you can't return pipe
        // cb(null);
    });
};
