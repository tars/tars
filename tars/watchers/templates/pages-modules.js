'use strict';

var pagesToWatch = 'markup/pages/**/*.';
var moduelsToWatch = 'markup/modules/**/*.';
var filesToWatch = [];

tars.templater.ext.forEach(function (extension) {
    filesToWatch.push(
        pagesToWatch + extension,
        moduelsToWatch + extension
    );
});

/**
 * Watcher for templates-files of modules and pages
 */
module.exports = function () {
    return tars.packages.chokidar.watch(filesToWatch, {
            ignored: '',
            persistent: true,
            ignoreInitial: true
        }).on('all', function (event, path) {
            tars.helpers.watcherLog(event, path);
            tars.packages.gulp.start('html:compile-templates');
        });
};
