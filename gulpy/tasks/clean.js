var gulp = require('gulp'),                                             // Gulp JS
    del = require('del'),                                               // Clean module
    cache = require('gulp-cached'),                                     // Gulp cache
    projectConfig = require('../../projectConfig'),
    clearCaches = require('../helpers/clearCaches'),                    // Clear caches for gulp-cache plugin
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