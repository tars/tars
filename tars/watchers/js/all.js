var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');

/**
 * Watcher for js-files before and after modules js
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
    var jsPathsToConcatBeforeModulesJs = tarsConfig.jsPathsToConcatBeforeModulesJs,
        jsPathsToConcatAfterModulesJs = tarsConfig.jsPathsToConcatAfterModulesJs,
        jsPathToWatch = [],
        i;

    if (jsPathsToConcatBeforeModulesJs.length) {
        for (i = 0; i < jsPathsToConcatBeforeModulesJs.length; i++) {
            jsPathToWatch.push(jsPathsToConcatBeforeModulesJs[i]);
        }
    }

    if (jsPathsToConcatAfterModulesJs.length) {
        for (i = 0; i < jsPathsToConcatAfterModulesJs.length; i++) {
            jsPathToWatch.push(jsPathsToConcatAfterModulesJs[i]);
        }
    }

    jsPathToWatch.push(
        'markup/' + tarsConfig.fs.staticFolderName + '/js/framework/**/*.js',
        'markup/' + tarsConfig.fs.staticFolderName + '/js/libraries/**/*.js',
        'markup/' + tarsConfig.fs.staticFolderName + '/js/plugins/**/*.js',
        'markup/modules/**/*.js'
    );

    return chokidar.watch(jsPathToWatch, {
        ignored: 'markup/modules/**/data/data.js',
        persistent: true,
        ignoreInitial: true
    }).on('all', function (event, path) {
        watcherLog(event, path);
        gulp.start('js:processing');
    });
};