var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var projectConfig = require('../../projectConfig');

var pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

    if (!projectConfig.useBuildVersioning) {
        pathsToDel.push('./builds/build/');
    }

/**
 * Clean dev directory and cache
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('clean', function(cb) {
        del(pathsToDel, cb);
    });
};