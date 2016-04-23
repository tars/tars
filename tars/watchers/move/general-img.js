'use strict';

const imagesFolderPath = `markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}`;

/**
 * Watcher for general images
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `${imagesFolderPath}/general/**/*.*`,
        Object.assign(tars.options.watch, {
            ignored: `${imagesFolderPath}/general/**/*.tmp`
        })
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);
        tars.packages.gulp.start('images:move-general-img');
    });
};
