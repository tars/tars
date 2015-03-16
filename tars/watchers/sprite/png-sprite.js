var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for images for sprite (png)
 * @param  {Object} watchOptions
 */
module.exports = function(watchOptions) {
    return chokidar.watch('markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/sprite/**/*.png', {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function(event, path) {
        watcherLog(event, path);
        gulp.start('css:make-sprite');
    });
};