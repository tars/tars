'use strict';

var gutil = tars.packages.gutil;

module.exports = function (event, path) {
    gutil.log('File: ' + gutil.colors.green.bold(path) + ' Event: ' + gutil.colors.green.bold(event));
};
