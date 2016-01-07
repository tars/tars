'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const chokidar = tars.packages.chokidar;
const watcherLog = tars.helpers.watcherLog;

/**
 * This is an example of watcher
 */
module.exports = function () {
    return chokidar.watch(
        '/* String of path pattern or array of strings */',
        {
            ignored: '/* String of path pattern or array of strings to ignore. If nothing to igonre — just set it empty string */',
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', function (event, path) {
        watcherLog(event, path);
        // You could start many tasks
        gulp.start(/* Task name (String) to start */);
    });
};
