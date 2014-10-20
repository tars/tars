var gulp = require('gulp'),
    del = require('del'),
    cache = require('gulp-cached'),
    projectConfig = require('../../projectConfig'),
    clearCaches = require('../helpers/clearCaches'),
    pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

    if (!projectConfig.useBuildVersioning) {
        pathsToDel.push('./builds/build/');
    }
    

cache.caches = {};

// Clean dev directory and cache
module.exports = function() {

    return gulp.task('clean', function(cb) {
        clearCaches(cache);

        del(pathsToDel, cb);
    });
};   