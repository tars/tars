'use strict';

// This is example of task function

var gulp = tars.packages.gulp;
var tarsConfig = tars.config;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
// Include browserSync, if you need to reload browser:
// var browserSync = tars.packages.browserSync;

// require('path to task file, which have to be done before current task');
// For example:
// require('./required-task-name');

/**
 * Task description
 */
module.exports = function () {

    return gulp.task('task-name', /*['required-task-name'],*/ function (cb) {
        return gulp.src(/* path-string or array of path-strings to files */)
            .pipe(plumber({
                errorHandler: function (error) {
                    notifier.error('An error occurred while something.', error);
                }
            }))
            // Do stuff here, like
            // .pipe(less())
            .pipe(gulp.dest(/* path-string to destination directory. Only directory, not a file! */))

            // If you need to reload browser, uncomment the row below
            // .pipe(browserSync.reload({ stream:true }))
            .pipe(
                // You can change text of success message
                notifier.success('Example task has been finished')
            );

        // You can return callback, if you can't return pipe
        // cb(null);
    });
};
