'use strict';

var watcherLog = tars.helpers.watcherLog;

/**
 * Watcher for ie9 stylies
 */
module.exports = function () {
    if (tars.flags.ie9 || tars.flags.ie) {
        return tars.packages.chokidar.watch(
                [
                    'markup/modules/**/ie9.' + tars.cssPreproc.ext,
                    'markup/modules/**/ie9.css',
                ], {
                    ignored: '',
                    persistent: true,
                    ignoreInitial: true
                }).on('all', function (event, path) {
                    watcherLog(event, path);
                    tars.packages.gulp.start('css:compile-css-for-ie9');
                });
    } else {
        return;
    }
};
