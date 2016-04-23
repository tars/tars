'use strict';

const watcherLog = tars.helpers.watcherLog;

/**
 * Watcher for ie9 stylies
 */
module.exports = () => {
    if (tars.flags.ie9 || tars.flags.ie) {
        return tars.packages.chokidar.watch(
            [
                `markup/${tars.config.fs.componentsFolderName}/**/ie9.${tars.cssPreproc.ext}`,
                `markup/${tars.config.fs.componentsFolderName}/**/ie9.css`
            ],
            tars.options.watch
        ).on('all', (event, watchedPath) => {
            watcherLog(event, watchedPath);
            tars.packages.gulp.start('css:compile-css-for-ie9');
        });
    }

    return false;
};
