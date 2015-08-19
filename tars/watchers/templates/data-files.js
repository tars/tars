'use strict';

/**
 * Watcher for data-files of modules
 */
module.exports = function () {
    return tars.packages.chokidar.watch('markup/modules/**/data/data.js', {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('compile-templates-with-data-reloading');
    });
};
