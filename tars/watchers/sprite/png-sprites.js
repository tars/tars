'use strict';
const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for images for sprite (png)
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(
            `markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/sprite/**/*.png`,
            tars.options.watch,
        )
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);
            runSequence('css:make-sprite', () => {});
        });
};
