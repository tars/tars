'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const path = require('path');

const filesToWatch = [
    `markup/pages/**/*.${tars.templater.ext}`,
    `markup/${tars.config.fs.componentsFolderName}/**/*.${tars.templater.ext}`,
];

/**
 * Watcher for templates-files of components and pages
 */
module.exports = () => {
    return tars.packages.chokidar
        .watch(
            filesToWatch,
            Object.assign(tars.options.watch, {
                ignored: `markup/pages/**/_*.${tars.templater.ext}`,
            }),
        )
        .on('all', (event, watchedPath) => {
            tars.helpers.watcherLog(event, watchedPath);

            if (
                watchedPath.indexOf(`markup${path.sep}pages`) > -1 &&
                (event === 'unlink' || event === 'add')
            ) {
                runSequence('html:concat-mocks-data', 'html:compile-templates', () => {});
            } else {
                runSequence('html:compile-templates', () => {});
            }
        });
};
