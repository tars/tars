'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const templaterName = require(`${tars.root}/helpers/get-templater-name`)(tars.config.templater.toLowerCase());

/**
 * Watcher for data-files of components
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        `markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
        tars.options.watch
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);

        // Remove cache for components with changed data-files
        if (templaterName === 'jade' && tars.packages.cache.caches && tars.packages.cache.caches.templates) {
            const templateToRecompile = watchedPath.split('/data/data.js').shift();

            for (let cacheKey in tars.packages.cache.caches.templates) {
                if (cacheKey.indexOf(templateToRecompile) > -1) {
                    delete tars.packages.cache.caches.templates[cacheKey];
                }
            }
        }

        runSequence(
            'html:concat-mocks-data',
            'html:compile-templates',
            () => {}
        );
    });
};
