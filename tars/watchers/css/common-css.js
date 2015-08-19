'use strict';

var gulp = require('gulp');
var tarsConfig = tars.config;
var watcherLog = tars.helpers.watcherLog;

/**
 * Watcher for common scss(less or stylus)-files and scss(less or stylus)-files of plugins
 */
module.exports = function () {
    return tars.packages.chokidar.watch([
            'markup/' + tarsConfig.fs.staticFolderName + '/' + tars.cssPreproc.name + '/**/*.' + tars.cssPreproc.ext,
            'markup/' + tarsConfig.fs.staticFolderName + '/' + tars.cssPreproc.name + '/**/*.css'
        ], {
            ignored: '',
            persistent: true,
            ignoreInitial: true
        }).on('all', function (event, path) {
            watcherLog(event, path);
            gulp.start('css:compile-css');

            if (tars.flags.ie8) {
                gulp.start('css:compile-css-for-ie8');
            }
        });
};
