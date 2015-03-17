var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Minify svg-images (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('images:minify-svg', function(cb) {
        if (tarsConfig.useSVG) {
            return gulp.src('./markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(changed(
                        'dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/minified-svg',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.svg'
                        }
                    )
                )
                .pipe(imagemin(
                        {
                            svgoPlugins: [
                                {cleanupIDs: false},
                                {removeViewBox: false},
                                {convertPathData: false},
                                {mergePaths: false}
                            ],
                            use: []
                        }
                    )
                )
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/minified-svg/'))
                .pipe(
                    notifier('SVG\'ve been minified')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};