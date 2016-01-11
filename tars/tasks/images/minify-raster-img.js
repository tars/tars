'use strict';

const gulp = tars.packages.gulp;
const changed = tars.packages.changed;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const rasterImagesPath = './dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/';

/**
 * Minify png and jpg images
 */
module.exports = () => {
    return gulp.task('images:minify-raster-img', () => {
        return gulp.src(rasterImagesPath + '**/*.{png, jpg}')
            .pipe(plumber({
                errorHandler: error => {
                    notifier.error('An error occurred while minifying raster images.', error);
                }
            }))
            .pipe(changed(rasterImagesPath))
            .pipe(tars.require('gulp-imagemin')())
            .pipe(gulp.dest(rasterImagesPath))
            .pipe(
                notifier.success('Rastered images\'ve been minified')
            );
    });
};
