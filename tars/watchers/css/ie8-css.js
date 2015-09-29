'use strict';

var watcherLog = tars.helpers.watcherLog;

/**
 * Watcher for ie8 stylies
 */
module.exports = function () {
    if (tars.flags.ie8 || tars.flags.ie) {
        return tars.packages.chokidar.watch('markup/modules/**/ie8.' + tars.cssPreproc.ext, {
                    ignored: '',
                    persistent: true,
                    ignoreInitial: true
                }).on('all', function (event, path) {
                    watcherLog(event, path);
                    tars.packages.gulp.start('css:compile-css-for-ie8');
                });
    } else {
        return;
    }
};
