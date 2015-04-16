var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Compress js-files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    require('./strip-debug')(buildOptions);

    return gulp.task('js:compress', ['js:strip-debug'], function () {
        return gulp.src(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
            .pipe(uglify('main' + buildOptions.hash + '.min.js', {
                mangle: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing js.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/'))
            .pipe(
                notifier('JS\'ve been minified')
            );
    });
};