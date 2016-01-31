'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const rename = tars.packages.rename;
const path = require('path');
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

/**
 * Move files from assets modules of modules
 */
module.exports = () => {
    return gulp.task('other:move-assets', () => {
        return gulp.src('./markup/modules/**/assets/**/*.*')
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving assets.', error);
                }
            }))
            .pipe(cache('move-assets'))
            .pipe(rename(filepath => {
                filepath.dirname = filepath.dirname.split(path.sep)[0];
            }))
            .pipe(
                gulp.dest(
                    './dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/assets/'
                )
            )
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Assets\'ve been moved')
            );
    });
};
