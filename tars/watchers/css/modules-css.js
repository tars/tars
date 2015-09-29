'use strict';

var watcherLog = tars.helpers.watcherLog;

/**
 * Watch for modules' css-files
 */
module.exports = function () {
    return tars.packages.chokidar.watch('markup/modules/**/*.' + tars.cssPreproc.ext, {
        ignored: [
            'markup/modules/**/ie8.' + tars.cssPreproc.ext
        ],
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        tars.packages.gulp.start('css:compile-css');

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie8');
        }
    });
};
