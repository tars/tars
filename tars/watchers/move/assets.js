'use strict';

/**
 * Watcher for images in assets dir of modules
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        'markup/modules/**/assets/*.*',
        {
            ignored: 'markup/modules/**/assets/*.tmp',
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('other:move-assets');
    });
};
