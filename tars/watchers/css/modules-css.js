'use strict';

const watcherLog = tars.helpers.watcherLog;

/**
 * Watch for modules' css-files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        'markup/modules/**/*.' + tars.cssPreproc.ext,
        {
            ignored: [
                'markup/modules/**/ie8.' + tars.cssPreproc.ext,
                'markup/modules/**/ie9.' + tars.cssPreproc.ext,
                'markup/modules/**/ie8.css',
                'markup/modules/**/ie9.css'
            ],
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        watcherLog(event, path);
        tars.packages.gulp.start('css:compile-css');

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie8');
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie9');
        }
    });
};
