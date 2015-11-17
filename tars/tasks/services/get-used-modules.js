'use strict';

var gulp = tars.packages.gulp;
var plumber = tars.packages.plumber;
var through2 = tars.packages.through2;
var path = require('path');
var modulesUtils = tars.helpers.modulesUtils;

var filesToProcces = [
    // 'markup/pages/**/*.' + tars.templater.ext,
    'markup/modules/**/*.' + tars.templater.ext,
    '!./**/_*.' + tars.templater.ext
];

var getAllModules = function() {
    return through2.obj(function (file, enc, callback) {
        var regexp = new RegExp('^.*(markup\/modules\/.*\/.*)$', 'i');
        var currentFile = file.history[0].match(regexp);

        console.log(currentFile[1]);

        if (currentFile.indexOf('markup/modules/') !== -1) {
            tars.modules = modulesUtils.getUsedModulesFromFile({
                action: 'init',
                file: file,
                filePath: currentFile,
                usedModulesPerFile: tars.usedModulesPerFile
            });
        }

        return callback();
    });
};

/**
 * Get included modules
 */
module.exports = function () {
    return gulp.task('service:get-used-modules', function () {
        return gulp.src(filesToProcces)
            .pipe(plumber({
                errorHandler: function (pipeError) {
                    notifier.error('An error occurred while compiling handlebars.', pipeError);
                    this.emit('end');
                }
            }))
            .pipe(getAllModules());
    });
};
