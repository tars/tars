var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watch for modules' css-files
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    return chokidar.watch('markup/modules/**/*.' + watchOptions.cssPreprocExtension, {
        ignored: [
            'markup/modules/**/ie8.' + watchOptions.cssPreprocExtension
        ],
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        gulp.start('css:compile-css');

        if (gutil.env.ie8) {
            gulp.start('css:compile-css-for-ie8');
        }
    });
};