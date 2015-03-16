var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for images for sprite (svg)
 * @param  {Object} watchOptions
 */
module.exports = function(watchOptions) {

    if (tarsConfig.useSVG) {
        return chokidar.watch('markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg/**/*.svg', {
            ignored: '',
            persistent: true,
            ignoreInitial: true
        }).on('all', function(event, path) {
            watcherLog(event, path);
            gulp.start('svg-actions');
        });
    } else {
        return;
    }
};