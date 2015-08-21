'use strict';

var gulp = tars.packages.gulp;
var gulpif = tars.packages.gulpif;
var cache = tars.packages.cache;
var rename = tars.packages.rename;
var path = require('path');
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

/**
 * Move files from assets modules of modules
 */
module.exports = function () {
    return gulp.task('other:move-assets', function (cb) {
        return gulp.src('./markup/modules/**/assets/**/*.*')
            .pipe(cache('move-assets'))
            .pipe(rename(function (filepath) {
                filepath.dirname = filepath.dirname.split(path.sep)[0];
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving assets.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/' + tars.config.fs.imagesFolderName + '/assets/'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Assets\'ve been moved')
            );
    });
};
