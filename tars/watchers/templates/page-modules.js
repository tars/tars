'use strict';

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
        {
            ignored: 'markup/**/_*.' + tars.templater.ext,
            persistent: true,
            ignoreInitial: true
        }
    ).on('all', (event, path) => {
        tars.helpers.watcherLog(event, path);

        if (path.indexOf('markup/pages') > -1 && (event === 'unlink' || event === 'add')) {
            tars.packages.gulp.start('compile-templates-with-data-reloading');
        } else {
            tars.packages.gulp.start('html:compile-templates');
        }
    });
};
