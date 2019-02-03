'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const separateFilesFilter = require(`${tars.root}/tasks/js/helpers/separate-files-filter`);
const separateJsFilesPath = `${tars.config.fs.staticFolderName}/js/separate-js`;

/**
 * Copy separate Js-files to dev directory
 */
module.exports = () => {
    return gulp.task('js:move-separate', () => {
        return gulp.src(`./markup/${separateJsFilesPath}/**/*.js`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving separate js-files.', error);
                }
            }))
            .pipe(separateFilesFilter())
            .pipe(cache('separate-js'))
            .pipe(gulp.dest(`${tars.config.devPath}${separateJsFilesPath}`))
            .pipe(
                notifier.success('Separate js files\'s been copied')
            );
    });
};
