'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const cache = tars.packages.cache;
const rename = tars.packages.rename;
const path = require('path');
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

const imgAssets = `./dev/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/assets/`;
const otherAssets = `./dev/${tars.config.fs.staticFolderName}/${tars.config.fs.componentsFolderName}-assets/`;

/**
 * Move files from components' assets to ready build
 */
module.exports = () => {
    return gulp.task('other:move-assets', () => {
        return gulp.src(`./markup/${tars.config.fs.componentsFolderName}/**/assets/**/*.*`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving assets.', error);
                }
            }))
            .pipe(cache('move-assets'))
            .pipe(rename(filepath => {
                let splittedPath = filepath.dirname.split(path.sep);
                splittedPath.pop();
                filepath.dirname = splittedPath.join(path.sep);
            }))
            .pipe(
                gulpif(
                    /\.(svg|png|jpg|jpeg|jpe|gif|tiff|bmp)$/i,
                    gulp.dest(imgAssets),
                    gulp.dest(otherAssets)
                )
            )
            .pipe(browserSync.reload({ stream: true }))
            .pipe(notifier.success('Assets\'ve been moved'));
    });
};
