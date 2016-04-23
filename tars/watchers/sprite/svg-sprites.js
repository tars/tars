'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for images for sprite (svg)
 */
module.exports = () => {
    if (tars.config.svg.active && tars.config.svg.workflow === 'sprite') {
        return tars.packages.chokidar.watch(
            `markup/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/svg/**/*.svg`,
            tars.options.watch
        ).on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);

            if (tars.flags.ie8 || tars.flags.ie) {
                runSequence(
                    ['images:minify-svg', 'images:raster-svg'],
                    ['css:make-fallback-for-svg', 'css:make-sprite-for-svg'],
                    () => {}
                );
            } else {
                runSequence(
                    'images:minify-svg',
                    'css:make-sprite-for-svg',
                    () => {}
                );
            }
        });
    }

    return false;
};
