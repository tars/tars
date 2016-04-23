'use strict';

/**
 * Watcher for misc files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.staticFolderName}/misc/**/*.*`,
        Object.assign(tars.options.watch, {
            ignored: `markup/${tars.config.fs.staticFolderName}/misc/**/*.tmp`
        })
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);
        tars.packages.gulp.start('other:move-misc-files');
    });
};
