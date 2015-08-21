'use strict';

var staticFolderName = tars.config.fs.staticFolderName;
var watcherLog = tars.helpers.watcherLog;

var jsPathToWatch = [];

if (tars.config.jsPathsToConcatBeforeModulesJs.length) {
    jsPathToWatch = jsPathToWatch.concat(tars.config.jsPathsToConcatBeforeModulesJs);
}

if (tars.config.jsPathsToConcatAfterModulesJs.length) {
    jsPathToWatch = jsPathToWatch.concat(tars.config.jsPathsToConcatAfterModulesJs);
}

jsPathToWatch.push(
    'markup/' + staticFolderName + '/js/framework/**/*.js',
    'markup/' + staticFolderName + '/js/libraries/**/*.js',
    'markup/' + staticFolderName + '/js/plugins/**/*.js',
    'markup/modules/**/*.js'
);

/**
 * Watcher for js-files before and after modules js
 */
module.exports = function () {
    return tars.packages.chokidar.watch(jsPathToWatch, {
        ignored: 'markup/modules/**/data/data.js',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        tars.packages.gulp.start('js:processing');
    });
};
