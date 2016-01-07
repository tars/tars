'use strict';

const imagesFolderPath = 'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName;

/**
 * Watcher for images in assets dir of modules
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        imagesFolderPath + '/content/**/*.*',
        {
            ignored: imagesFolderPath + '/content/**/*.tmp',
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('images:move-content-img');
    });
};
