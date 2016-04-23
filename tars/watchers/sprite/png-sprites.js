'use strict';

/**
 * Watcher for images for sprite (png)
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/sprite/**/*.png`,
        tars.options.watch
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);
        tars.packages.gulp.start('css:make-sprite');
    });
};
