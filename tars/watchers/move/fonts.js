'use strict';

/**
 * Watcher for font files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        'markup/' + tars.config.fs.staticFolderName + '/fonts/**/*.*',
        tars.options.watch
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('other:move-fonts');
    });
};
