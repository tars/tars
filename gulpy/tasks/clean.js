var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    projectConfig = require('../../projectConfig'),
    pathsToDel = [
        './dev/',
        './.tmpTemplater/',
        './.tmpPreproc/'
    ];

    if (gutil.env.clean) {
        pathsToDel.push('./builds/');
    } else {
        pathsToDel.push(
            './builds/build/*.*',
            './builds/build/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/'
        );
    }

// Clean dev directory and cache
module.exports = function(buildOptions) {

    return gulp.task('clean', function(cb) {
        del(pathsToDel, cb);
    });
};   