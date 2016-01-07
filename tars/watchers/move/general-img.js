'use strict';

const imagesFolderPath = 'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName;

/**
 * Watcher for general images
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        imagesFolderPath + '/general/**/*.*',
        {
            ignored: imagesFolderPath + '/general/**/*.tmp',
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('images:move-general-img');
    });
};
