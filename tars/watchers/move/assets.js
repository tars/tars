'use strict';

/**
 * Watcher for images in assets dir of components
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.componentsFolderName}/**/assets/*.*`,
        Object.assign(tars.options.watch, {
            ignored: `markup/${tars.config.fs.componentsFolderName}/**/assets/*.tmp`
        })
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);
        tars.packages.gulp.start('other:move-assets');
    });
};
