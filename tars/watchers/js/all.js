'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);
const watcherLog = tars.helpers.watcherLog;

const jsFolderPath = 'markup/' + tars.config.fs.staticFolderName + '/js';

/**
 * Watcher for js-files before and after components js
 */
module.exports = () => {
    if (tars.config.js.workflow === 'concat') {
        let jsPathToWatch = [];

        if (tars.config.js.jsPathsToConcatBeforeModulesJs.length) {
            jsPathToWatch = jsPathToWatch.concat(tars.config.js.jsPathsToConcatBeforeModulesJs);
        }

        if (tars.config.js.jsPathsToConcatAfterModulesJs.length) {
            jsPathToWatch = jsPathToWatch.concat(tars.config.js.jsPathsToConcatAfterModulesJs);
        }

        jsPathToWatch.push(
            `${jsFolderPath}/framework/**/*.js`,
            `${jsFolderPath}/libraries/**/*.js`,
            `${jsFolderPath}/plugins/**/*.js`,
            `markup/${tars.config.fs.componentsFolderName}/**/*.js`,
        );

        return tars.packages.chokidar
            .watch(
                jsPathToWatch,
                Object.assign(tars.options.watch, {
                    ignored: `markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
                }),
            )
            .on('all', (event, watchedPath) => {
                watcherLog(event, watchedPath);
                runSequence('js:processing');
            });
    }

    return false;
};
