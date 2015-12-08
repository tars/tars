'use strict';

/**
 * Watcher for separate Js files files
 */
module.exports = function () {
    return tars.packages.chokidar.watch('markup/' + tars.config.fs.staticFolderName + '/' + tars.cssPreproc.name + '/separate-css/**/*.css', {
        ignored: '',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        tars.helpers.watcherLog(event, path);
        tars.packages.gulp.start('css:move-separate');
    });
};
