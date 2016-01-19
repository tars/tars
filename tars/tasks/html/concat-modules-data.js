'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const concat = tars.packages.concat;
const notifier = tars.helpers.notifier;

const generatePageListData = require(tars.root + '/tasks/html/helpers/generate-page-list-data');

/**
 * conact data for modules to one file
 */
module.exports = () => {
    return gulp.task('html:concat-modules-data', () => {
        return gulp.src(['./markup/pages/**/*.' + tars.templater.ext,
                         '!./markup/pages/**/_*.' + tars.templater.ext,
                         './markup/modules/**/data/data.js'])
            .pipe(plumber({
                errorHandler: error => {
                    notifier.error('An error occurred while concating module\'s data.', error);
                }
            }))
            .pipe(generatePageListData())
            .pipe(concat('modulesData.js', { newLine: ',\n\n' }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                notifier.success('Data for modules ready')
            );
    });
};
