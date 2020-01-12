'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for misc files
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(
            `markup/${tars.config.fs.staticFolderName}/misc/**/*.*`,
            Object.assign(tars.options.watch, {
                ignored: `markup/${tars.config.fs.staticFolderName}/misc/**/*.tmp`,
            }),
        )
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);
            runSequence('other:move-misc-files');
        });
};
