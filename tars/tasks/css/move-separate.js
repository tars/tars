'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const staticFolderName = tars.config.fs.staticFolderName;

/**
 * Copy separate Css-files to dev directory
 */
module.exports = () => {
    return gulp.task('css:move-separate', () => {
        return gulp.src(`./markup/${staticFolderName}/${tars.cssPreproc.name}/separate-css/**/*.css`)
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving separate css-files.', error);
                }
            }))
            .pipe(cache('separate-css'))
            .pipe(gulp.dest(`./dev/${staticFolderName}/css/separate-css`))
            .pipe(
                notifier.success('Separate css files\'s been copied')
            );
    });
};
