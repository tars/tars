'use strict';

var gulp = tars.packages.gulp;
var del = tars.packages.del;
var tarsConfig = tars.config;

var pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

if (!tarsConfig.useBuildVersioning) {
    pathsToDel.push(tars.options.build.path);
}

/**
 * Clean dev directory and cache
 */
module.exports = function () {
    return gulp.task('service:clean', function (cb) {
        del(pathsToDel, cb);
    });
};
