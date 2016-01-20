'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const separateFilesFilter = require(tars.root + '/tasks/js/helpers/separate-files-filter');
const separateJsFilesPath = tars.config.fs.staticFolderName + '/js/separate-js';
const useFilter = !tars.flags.ie && !tars.flags.ie8;

/**
 * Copy separate Js-files to dev directory
 */
module.exports = () => {
    return gulp.task('js:move-separate', () => {
        gulp.src('./markup/' + separateJsFilesPath + '/**/*.js')
            .pipe(plumber({
                errorHandler: error => {
                    notifier.error('An error occurred while moving separate js-files.', error);
                }
            }))
            .pipe(gulpif(useFilter, separateFilesFilter()))
            .pipe(cache('separate-js'))
            .pipe(gulp.dest('./dev/' + separateJsFilesPath))
            .pipe(
                notifier.success('Separate js files\'s been copied')
            );
    });
};
