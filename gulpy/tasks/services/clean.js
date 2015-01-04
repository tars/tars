var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var tarsConfig = require('../../../tars-сonfig');

var pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

/**
 * Clean dev directory and cache
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    if (!tarsConfig.useBuildVersioning) {
        pathsToDel.push(buildOptions.buildPath);
    }

    return gulp.task('clean', function(cb) {
        del(pathsToDel, cb);
    });
};