'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var imagemin = tars.packages.imagemin;
var changed = tars.packages.changed;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Minify svg-images (optional task)
 */
module.exports = function () {
    return gulp.task('images:minify-svg', function (cb) {
        if (tars.config.useSVG) {
            return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/svg/*.svg')
                .pipe(changed(
                        'dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/minified-svg',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.svg'
                        }
                    )
                )
                .pipe(imagemin(
                        {
                            svgoPlugins: [
                                { cleanupIDs: false },
                                { removeViewBox: false },
                                { convertPathData: false },
                                { mergePaths: false }
                            ],
                            use: []
                        }
                    )
                )
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/minified-svg/'))
                .pipe(
                    notifier('SVG\'ve been minified')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};
