var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    projectConfig = require('../../projectConfig'),
    pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

    if (!projectConfig.useBuildVersioning) {
        pathsToDel.push('./builds/build/');
    }

// Clean dev directory and cache
module.exports = function(buildOptions) {

    return gulp.task('clean', function(cb) {
        del(pathsToDel, cb);
    });
};   