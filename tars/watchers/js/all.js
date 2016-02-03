'use strict';

const watcherLog = tars.helpers.watcherLog;

const jsFolderPath = 'markup/' + tars.config.fs.staticFolderName + '/js';

let jsPathToWatch = [];

if (tars.config.jsPathsToConcatBeforeModulesJs.length) {
    jsPathToWatch = jsPathToWatch.concat(tars.config.jsPathsToConcatBeforeModulesJs);
}

if (tars.config.jsPathsToConcatAfterModulesJs.length) {
    jsPathToWatch = jsPathToWatch.concat(tars.config.jsPathsToConcatAfterModulesJs);
}

jsPathToWatch.push(
    jsFolderPath + '/framework/**/*.js',
    jsFolderPath + '/libraries/**/*.js',
    jsFolderPath + '/plugins/**/*.js',
    'markup/modules/**/*.js'
);

/**
 * Watcher for js-files before and after modules js
 */
module.exports = () => {
    return tars.packages.chokidar.watch(
        jsPathToWatch,
        Object.assign(tars.options.watch, {
            ignored: 'markup/modules/**/data/data.js'
        })
    ).on('all', (event, watchedPath) => {
        watcherLog(event, watchedPath);
        tars.packages.gulp.start('js:processing');
    });
};
