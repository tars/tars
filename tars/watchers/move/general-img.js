'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const imagesFolderPath = `markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}`;

/**
 * Watcher for general images
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(
            `${imagesFolderPath}/general/**/*.*`,
            Object.assign(tars.options.watch, {
                ignored: `${imagesFolderPath}/general/**/*.tmp`,
            }),
        )
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);
            runSequence('images:move-general-img');
        });
};
