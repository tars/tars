'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const concat = tars.packages.concat;
const autoprefixer = tars.packages.autoprefixer;
const importify = tars.packages.importify;
const postcss = tars.packages.postcss;
const replace = tars.packages.replace;
const sourcemaps = tars.packages.sourcemaps;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const stringHelper = tars.helpers.stringHelper;

module.exports = function generateTaskContent(browser) {

    browser = browser || '';

    const preprocExtensions = tars.cssPreproc.ext;
    const preprocName = tars.cssPreproc.name;
    const capitalizePreprocName = stringHelper.capitalizeFirstLetter(preprocName);
    const stylesFolderPath = `./markup/${tars.config.fs.staticFolderName}/${preprocName}`;
    const sourceMapsDest = tars.config.sourcemaps.css.inline ? '' : '.';

    let successMessage = `${capitalizePreprocName}-files have been compiled`;
    let errorMessage = 'An error occurred while compiling css';
    let compiledFileName = 'main';
    let generateSourceMaps = false;

    let postProcessors = [];
    let stylesFilesToConcatinate = [];
    let firstStylesFilesToConcatinate = [
        `${stylesFolderPath}/normalize.${preprocExtensions}`,
        `${stylesFolderPath}/libraries/**/*.${preprocExtensions}`,
        `${stylesFolderPath}/libraries/**/*.css`,
        `${stylesFolderPath}/mixins.${preprocExtensions}`,
        `${stylesFolderPath}/sprites-${preprocName}/sprite_96.${preprocExtensions}`
    ];
    const generalStylesFilesToConcatinate = [
        `${stylesFolderPath}/fonts.${preprocExtensions}`,
        `${stylesFolderPath}/vars.${preprocExtensions}`,
        `${stylesFolderPath}/GUI.${preprocExtensions}`,
        `${stylesFolderPath}/common.${preprocExtensions}`,
        `${stylesFolderPath}/plugins/**/*.${preprocExtensions}`,
        `${stylesFolderPath}/plugins/**/*.css`,
        `./markup/${tars.config.fs.componentsFolderName}/**/*.${preprocExtensions}`,
        `./markup/${tars.config.fs.componentsFolderName}/**/*.css`
    ];
    const lastStylesFilesToConcatinate = [
        `${stylesFolderPath}/etc/**/*.${preprocExtensions}`,
        `${stylesFolderPath}/etc/**/*.css`,
        `!${stylesFolderPath}/entry/**/*.${preprocExtensions}`,
        `!${stylesFolderPath}/entry/**/*.css`,
        `!./**/_*.${preprocExtensions}`,
        '!./**/_*.css'
    ];

    if (tars.config.postcss && tars.config.postcss.length) {
        tars.config.postcss.forEach(postProcessor => {
            postProcessors.push(require(postProcessor.name)(postProcessor.options));
        });
    }

    if (preprocName === 'less' || preprocName === 'stylus') {
        firstStylesFilesToConcatinate.push(
            `${stylesFolderPath}/sprites-${preprocName}/sprite-png.${preprocExtensions}`
        );
    }

    switch (browser) {
        case 'ie8':
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate,
                `${stylesFolderPath}/sprites-${preprocName}/svg-fallback-sprite.${preprocExtensions}`,
                `${stylesFolderPath}/sprites-${preprocName}/sprite-ie.${preprocExtensions}`,
                generalStylesFilesToConcatinate,
                `./markup/${tars.config.fs.componentsFolderName}/**/ie/ie8.${preprocExtensions}`,
                `./markup/${tars.config.fs.componentsFolderName}/**/ie/ie8.css`,
                lastStylesFilesToConcatinate
            );

            postProcessors.push(
                autoprefixer({browsers: ['ie 8']})
            );

            generateSourceMaps = false;

            compiledFileName += `_${browser}`;

            successMessage = `${capitalizePreprocName}-files for IE8 have been compiled`;
            errorMessage = 'An error occurred while compiling css for IE8.';

            break;
        case 'ie9':
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate
            );

            if (tars.config.svg.active && tars.config.svg.workflow === 'sprite') {
                stylesFilesToConcatinate.push(
                    `${stylesFolderPath}/sprites-${preprocName}/svg-sprite.${preprocExtensions}`
                );
            }

            stylesFilesToConcatinate.push(
                generalStylesFilesToConcatinate,
                `./markup/${tars.config.fs.componentsFolderName}/**/ie/ie9.${preprocExtensions}`,
                `./markup/${tars.config.fs.componentsFolderName}/**/ie/ie9.css`,
                lastStylesFilesToConcatinate
            );

            postProcessors.push(
                autoprefixer({browsers: ['ie 9']})
            );

            compiledFileName += `_${browser}`;

            generateSourceMaps = false;

            successMessage = `${capitalizePreprocName}-files for IE9 have been compiled`;
            errorMessage = 'An error occurred while compiling css for IE9.';

            break;
        // Styles for all browsers except IE8, IE9
        default:
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate
            );

            if (tars.config.svg.active && tars.config.svg.workflow === 'sprite') {
                stylesFilesToConcatinate.push(
                    `${stylesFolderPath}/sprites-${preprocName}/svg-sprite.${preprocExtensions}`,
                    `!./markup/${tars.config.fs.componentsFolderName}/**/ie/ie9.${preprocExtensions}`,
                    `!./markup/${tars.config.fs.componentsFolderName}/**/ie/ie9.css`,
                    `!./markup/${tars.config.fs.componentsFolderName}/**/ie/ie8.${preprocExtensions}`,
                    `!./markup/${tars.config.fs.componentsFolderName}/**/ie/ie8.css`
                );
            }

            stylesFilesToConcatinate.push(
                generalStylesFilesToConcatinate,
                lastStylesFilesToConcatinate
            );

            if (tars.pluginsConfig.autoprefixerConfig) {
                postProcessors.push(
                    autoprefixer({browsers: tars.pluginsConfig.autoprefixerConfig})
                );
            }

            generateSourceMaps = tars.config.sourcemaps.css.active && tars.options.watch.isActive;

            break;
    }

    stylesFilesToConcatinate = [].concat.apply([], stylesFilesToConcatinate);

    return gulp.src(stylesFilesToConcatinate, { base: process.cwd() })
        .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
        .pipe(plumber({
            errorHandler(error) {
                notifier.error(errorMessage, error);
                this.emit('end');
            }
        }))
        .pipe(importify(compiledFileName + '.' + tars.cssPreproc.mainExt, {
            cssPreproc: preprocName
        }))
        .pipe(tars.cssPreproc.preprocessor())
        .pipe(replace({
            patterns: [
                {
                    match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
                    replacement: tars.config.staticPrefixForCss
                }
            ],
            usePrefix: false
        }))
        .pipe(postcss(postProcessors))
        .pipe(concat(`${compiledFileName}${tars.options.build.hash}.css`))
        .pipe(gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)))
        .pipe(gulp.dest(`./dev/${tars.config.fs.staticFolderName}/css/`))
        .pipe(browserSync.reload({ stream: true, match: '**/*.css' }))
        .pipe(
            notifier.success(successMessage)
        );
};
