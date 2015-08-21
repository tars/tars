'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var cache = tars.packages.cache;
var changed = tars.packages.changed;
var svg2png = tars.packages.svg2png;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Raster SVG-files (optional task)
 */
module.exports = function () {
    return gulp.task('images:raster-svg', function (cb) {

        if (tars.config.useSVG && tars.flags.ie8) {
            return gulp.src('./markup/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('raster-svg'))
                .pipe(
                    changed(
                        'dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/rastered-svg-images',
                        {
                            hasChanged: changed.compareLastModifiedTime,
                            extension: '.png'
                        }
                    )
                )
                .pipe(svg2png())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while rastering svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/rastered-svg-images'))
                .pipe(
                    notifier('SVG\'ve been rastered')
                );
        } else {
            gutil.log('!Rastering SVG is not used!');
            cb(null);
        }
    });
};
