'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const path = require('path');

const filesToWatch = [
    'markup/pages/**/*.' + tars.templater.ext,
    'markup/modules/**/*.' + tars.templater.ext
];

/**
 * Watcher for templates-files of modules and pages
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        filesToWatch,
        Object.assign(tars.options.watch, {
            ignored: 'markup/**/_*.' + tars.templater.ext
        })
    ).on('all', (event, watchedPath) => {
        tars.helpers.watcherLog(event, watchedPath);

        if (watchedPath.indexOf(`markup${path.sep}pages`) > -1 && (event === 'unlink' || event === 'add')) {
            runSequence(
                'html:concat-modules-data',
                'html:compile-templates',
                () => {}
            );
        } else {
            gulp.start('html:compile-templates');
        }
    });
};
