var gulp = require('gulp'),
    del = require('del'),
    cache = require('gulp-cached'),
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
        delete cache.caches[
                'linting', 'move-assets', 'move-content-img', 'move-plugins-img',
                'move-fonts', 'move-svg', 'raster-svg', 'separate-js'
            ];

        del(pathsToDel, cb);
    });
};   