'use strict';
const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for font files
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(`markup/${tars.config.fs.staticFolderName}/fonts/**/*.*`, tars.options.watch)
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);
            runSequence('other:move-fonts');
        });
};
