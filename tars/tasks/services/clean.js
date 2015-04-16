var gulp = require('gulp');
var del = require('del');
var tarsConfig = require('../../../tars-config');

var pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

/**
 * Clean dev directory and cache
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    if (!tarsConfig.useBuildVersioning) {
        pathsToDel.push(buildOptions.buildPath);
    }

    return gulp.task('service:clean', function (cb) {
        del(pathsToDel, cb);
    });
};