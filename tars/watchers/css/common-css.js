'use strict';

const watcherLog = tars.helpers.watcherLog;
const cssPreprocFolderPath = `markup/${tars.config.fs.staticFolderName}/${tars.cssPreproc.name}`;
const globsToWatch = [
    `${cssPreprocFolderPath}/**/*.${tars.cssPreproc.ext}`,
    `${cssPreprocFolderPath}/**/*.css`
];

/**
 * Watcher for all scss(less or stylus)-files
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        globsToWatch,
        Object.assign(tars.options.watch, {
            ignored: [`${cssPreprocFolderPath}/separate-css/**/*.css`]
        })
    ).on('all', (event, watchedPath) => {
        watcherLog(event, watchedPath);
        tars.packages.gulp.start('css:compile-css');

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie8');
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.packages.gulp.start('css:compile-css-for-ie9');
        }
    });
};
