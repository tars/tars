'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for data-files of components
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
        tars.options.watch
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);

        runSequence(
            'html:concat-mocks-data',
            'html:compile-templates',
            () => {}
        );
    });
};
