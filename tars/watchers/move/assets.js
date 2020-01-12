'use strict';
const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for images in assets dir of components
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(
            `markup/${tars.config.fs.componentsFolderName}/**/assets/*.*`,
            Object.assign(tars.options.watch, {
                ignored: `markup/${tars.config.fs.componentsFolderName}/**/assets/*.tmp`,
            }),
        )
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);
            runSequence('other:move-assets', () => {});
        });
};
