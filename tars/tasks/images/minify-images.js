'use strict';

const gulp = tars.packages.gulp;
const changed = tars.packages.changed;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

const imagesFolderPath = `dev/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}`;

/**
 * Minify png and jpg images
 */
module.exports = () => {
    return gulp.task('images:minify-images', () => {
        return gulp.src(
                /* eslint-disable indent */
                [
                    `${imagesFolderPath}/**/*.{png,jpg,svg}`,
                    `!${imagesFolderPath}/minified-svg/*.svg`,
                    `!${imagesFolderPath}/**/svg-symbols${tars.options.build.hash}.svg`
                ],
                /* eslint-enable indent */
                { base: process.cwd() + '/' }
            )
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while minifying all images.', error);
                }
            }))
            .pipe(changed(imagesFolderPath))
            .pipe(tars.require('gulp-imagemin')(
                {
                    svgoPlugins: [
                        { cleanupIDs: false },
                        { removeViewBox: false },
                        { convertPathData: false },
                        { mergePaths: false }
                    ],
                    use: []
                }
            ))
            .pipe(gulp.dest('./'))
            .pipe(
                notifier.success('Rastered images\'ve been minified')
            );
    });
};
