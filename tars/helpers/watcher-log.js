'use strict';

var gutil = tars.packages.gutil;

/**
 * Helper for watcher logging
 * @param  {String} event Type of event
 * @param  {String} path  Path of changed file
 */
module.exports = function (event, path) {
    gutil.log('File: ' + gutil.colors.green.bold(path) + ' Event: ' + gutil.colors.green.bold(event));
};
