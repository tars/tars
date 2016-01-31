'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Watcher for images for symbols (svg)
 */
module.exports = () => {

    if (tars.config.svg.active && tars.config.svg.workflow === 'symbols') {

        return tars.packages.chokidar.watch(
            'markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/svg/**/*.svg',
            tars.options.watch
        ).on('all', (event, path) => {
            tars.helpers.watcherLog(event, path);

            let tasksSequence = ['images:minify-svg'];

            switch (tars.config.svg.symbolsConfig.loadingType) {
                case 'separate-file':
                case 'separate-file-with-link':
                    tasksSequence.push(
                        'images:make-symbols-sprite',
                        'html:concat-modules-data'
                    );
                case 'inject':
                    tasksSequence.push(
                        'html:compile-templates'
                    );
                    break;
                default:
                    break;
            }

            tasksSequence.push(() => {});
            runSequence(tasksSequence);
        });
    }

    return false;
};
