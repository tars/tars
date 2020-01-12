'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const concat = tars.packages.concat;
const notifier = tars.helpers.notifier;

const pagesAndDataFilesProcessing = require(`${tars.root}/tasks/html/helpers/pages-and-data-files-processing`);

/**
 * concat data for components and some other sources to one file
 */
module.exports = () => {
    return gulp.task('html:concat-mocks-data', () => {
        return gulp
            .src(
                [
                    `./markup/pages/**/*.${tars.templater.ext}`,
                    `!./markup/pages/**/_*.${tars.templater.ext}`,
                    `./markup/${tars.config.fs.componentsFolderName}/**/data/data.js`,
                    `${tars.config.devPath}temp/symbols-data-template.js`,
                ],
                { allowEmpty: true },
            )
            .pipe(
                plumber({
                    errorHandler(error) {
                        notifier.error(
                            `An error occurred while concating ${tars.config.fs.componentsFolderName}'s data.`,
                            error,
                        );
                    },
                }),
            )
            .pipe(pagesAndDataFilesProcessing())
            .pipe(concat('mocksData.js', { newLine: ',\n\n' }))
            .pipe(gulp.dest(`${tars.config.devPath}temp/`))
            .pipe(notifier.success(`Data for ${tars.config.fs.componentsFolderName} ready`));
    });
};
