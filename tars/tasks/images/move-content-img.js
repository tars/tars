'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

const contentImagesPath = './markup/' + tars.config.fs.staticFolderName + '/'
                            + tars.config.fs.imagesFolderName + '/content';

/**
 * Move images for content
 */
module.exports = () => {
    return gulp.task('images:move-content-img', () => {
        return gulp.src(contentImagesPath + '/**/*.*')
            .pipe(plumber({
                errorHandler: (error) => {
                    notifier.error('An error occurred while moving content images.', error);
                }
            }))
            .pipe(cache('move-content-img'))
            .pipe(gulp.dest(contentImagesPath))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Content images\'ve been moved')
            );
    });
};
