var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for ie8 stylies
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    if (gutil.env.ie8) {
        return chokidar.watch('markup/modules/**/ie8.' + watchOptions.cssPreprocExtension, {
                    ignored: '',
                    persistent: true,
                    ignoreInitial: true
                }).on('all', function (event, path) {
                    watcherLog(event, path);
                    gulp.start('css:compile-css-for-ie8');
                });
    } else {
        return;
    }
};