'use strict';

/**
 * Watcher for images for sprite (png)
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/sprite/**/*.png',
        tars.options.watch
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('css:make-sprite');
    });
};
