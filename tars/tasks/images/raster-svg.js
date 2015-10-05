'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var cache = tars.packages.cache;
var changed = tars.packages.changed;
var svg2png = tars.packages.svg2png;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

/**
 * Raster SVG-files (optional task)
 */
module.exports = function () {
    return gulp.task('images:raster-svg', function (cb) {

        if (tars.config.useSVG && (tars.flags.ie8 || tars.flags.ie)) {
            return gulp.src('./markup/' + staticFolderName + '/' + imagesFolderName + '/svg/*.svg')
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while rastering svg.', error);
                    }
                }))
                .pipe(cache('raster-svg'))
                .pipe(
                    changed(
                        'dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.png'
                        }
                    )
                )
                .pipe(svg2png())
                .pipe(gulp.dest('dev/' + staticFolderName + '/' + imagesFolderName + '/rastered-svg-images'))
                .pipe(
                    notifier.success('SVG\'ve been rastered')
                );
        } else {
            gutil.log('!Rastering SVG is not used!');
            cb(null);
        }
    });
};
