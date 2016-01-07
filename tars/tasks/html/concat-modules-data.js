'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const concat = tars.packages.concat;
const notifier = tars.helpers.notifier;

/**
 * conact data for modules to one file
 */
module.exports = () => {
    return gulp.task('html:concat-modules-data', () => {
        return gulp.src('./markup/modules/**/data/data.js')
            .pipe(plumber({
                errorHandler: (error) => {
                    notifier.error('An error occurred while concating module\'s data.', error);
                }
            }))
            .pipe(concat('modulesData.js', { newLine: ',\n\n' }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                notifier.success('Data for modules ready')
            );
    });
};
