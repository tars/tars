'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for data-files of modules
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        'markup/modules/**/data/data.js',
        tars.options.watch
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);

        runSequence(
            'html:concat-modules-data',
            'html:compile-templates',
            () => {}
        );
    });
};
