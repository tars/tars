'use strict';

const imagesFolderPath = 'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName;

/**
 * Watcher for images of plugins
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        imagesFolderPath + '/plugins/**/*.*',
        {
            ignored: imagesFolderPath + '/plugins/**/*.tmp',
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('images:move-plugins-img');
    });
};
