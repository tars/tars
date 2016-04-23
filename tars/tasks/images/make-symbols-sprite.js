'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const rename = tars.packages.rename;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const skipTaskWithEmptyPipe = tars.helpers.skipTaskWithEmptyPipe;

const svgImagesPath = `./dev/${tars.config.fs.staticFolderName}/${tars.config.fs.imagesFolderName}/minified-svg/`;
let readySymbolSpritePath = `./dev/${tars.config.svg.symbolsConfig.pathToExternalSymbolsFile}`;

if (tars.config.svg.symbolsConfig.loadingType === 'inject') {
    readySymbolSpritePath = './dev/temp/';
}

/**
 * Minify png and jpg images
 */
module.exports = () => {
    return gulp.task('images:make-symbols-sprite', done => {

        if (tars.config.svg.active && tars.config.svg.workflow === 'symbols') {
            return gulp.src(`${svgImagesPath}**/*.svg`)
                .pipe(plumber({
                    errorHandler(error) {
                        notifier.error('An error occurred while creating symbols sprite.', error);
                    }
                }))
                .pipe(skipTaskWithEmptyPipe('images:make-symbols-sprite', done))
                .pipe(tars.require('gulp-svg-symbols')(
                    {
                        templates: [
                            `${tars.root}/tasks/images/helpers/svg-symbols.svg`,
                            `${tars.root}/tasks/images/helpers/symbols-data-template.js`
                        ],
                        transformData: (svg, defaultData) => {
                            return {
                                id: defaultData.id,
                                width: svg.width,
                                height: svg.height,
                                name: svg.name
                            };
                        }
                    }
                ))
                .pipe(
                    gulpif(/[.]svg$/, rename(spritePath => {
                        spritePath.basename += tars.options.build.hash;
                    }))
                )
                .pipe(
                    gulpif(/[.]svg$/, gulp.dest(readySymbolSpritePath))
                )
                .pipe(
                    gulpif(/[.]js$/, gulp.dest('./dev/temp/'))
                )
                .pipe(
                    notifier.success('Symbols sprite\'s been created')
                );
        }

        tars.skipTaskLog('images:make-symbols-sprite', 'SVG is not used or you prefer svg-sprite workflow');
        done(null);
    });
};
