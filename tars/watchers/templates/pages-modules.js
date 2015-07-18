var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for templates-files of modules and pages
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    var pagesToWatch = 'markup/pages/**/*.';
    var moduelsToWatch = 'markup/modules/**/*.';
    var filesToWatch = [];
    var templateExtension = watchOptions.templateExtension;

    if (templateExtension instanceof Array) {
        templateExtension.forEach(function (item) {
            filesToWatch.push(
                pagesToWatch + item,
                moduelsToWatch + item
            );
        });
    } else {
        filesToWatch.push(
            pagesToWatch + templateExtension,
            moduelsToWatch + templateExtension
        );
    }

    return chokidar.watch(filesToWatch, {
            ignored: '',
            persistent: true,
            ignoreInitial: true
        }).on('all', function (event, path) {
            watcherLog(event, path);
            gulp.start('html:compile-templates');
        });
};