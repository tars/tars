'use strict';

/**
 * Watcher for separate Js files files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.staticFolderName}/js/separate-js/**/*.js`,
        tars.options.watch
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);
        tars.packages.gulp.start('js:move-separate');
    });
};
