'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var imagemin = tars.packages.imagemin;
var changed = tars.packages.changed;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Minify svg-images (optional task)
 */
module.exports = function () {
    return gulp.task('images:minify-svg', function (cb) {
        if (tars.config.useSVG) {
            return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/svg/*.svg')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while minifying svg.', error);
                    }
                }))
                .pipe(changed(
                        'dev/' + staticFolderName + '/' + imagesFolderName + '/minified-svg',
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
                .pipe(gulp.dest('./dev/' + staticFolderName + '/' + imagesFolderName + '/minified-svg/'))
                .pipe(
                    notifier.success('SVG\'ve been minified')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};
