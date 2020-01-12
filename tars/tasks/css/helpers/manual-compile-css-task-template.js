'use strict';

const gulp = tars.packages.gulp;
const gulpif = tars.packages.gulpif;
const rename = tars.packages.rename;
const autoprefixer = tars.packages.autoprefixer;
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
    let generateSourceMaps = false;

    let postProcessors = [];
    let stylesFilesToCompile = [];
    let stylesFilesToIgnore = [`./**/_*.${preprocExtensions}`, './**/_*.css'];

    if (tars.config.postcss && tars.config.postcss.length) {
        tars.config.postcss.forEach((postProcessor) => {
            postProcessors.push(require(postProcessor.name)(postProcessor.options));
        });
    }
    switch (browser) {
        case 'ie8':
            stylesFilesToCompile.push(`${stylesFolderPath}/entry/ie/*_ie8.${preprocExtensions}`);

            postProcessors.push(autoprefixer({ browsers: ['ie 8'] }));

            generateSourceMaps = false;
            successMessage = `${capitalizePreprocName}-files for IE8 have been compiled`;
            errorMessage = 'An error occurred while compiling css for IE8.';
            break;
        case 'ie9':
            stylesFilesToCompile.push(`${stylesFolderPath}/entry/ie/*_ie9.${preprocExtensions}`);

            postProcessors.push(autoprefixer({ browsers: ['ie 9'] }));

            generateSourceMaps = false;
            successMessage = `${capitalizePreprocName}-files for IE9 have been compiled`;
            errorMessage = 'An error occurred while compiling css for IE9.';
            break;
        // Styles for all browsers except IE8, IE9
        default:
            stylesFilesToCompile.push(`${stylesFolderPath}/entry/*.${preprocExtensions}`);

            postProcessors.push(autoprefixer());

            generateSourceMaps = tars.config.sourcemaps.css.active && tars.options.watch.isActive;
            break;
    }

    return gulp
        .src(stylesFilesToCompile, {
            ignore: stylesFilesToIgnore,
        })
        .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
        .pipe(
            plumber({
                errorHandler(error) {
                    notifier.error(errorMessage, error);
                    this.emit('end');
                },
            }),
        )
        .pipe(tars.cssPreproc.preprocessor())
        .pipe(
            replace({
                patterns: [
                    {
                        match: /%=staticPrefixForCss=%|%=static=%|__static__/gim,
                        replacement: tars.config.staticPrefixForCss,
                    },
                ],
                usePrefix: false,
            }),
        )
        .pipe(postcss(postProcessors))
        .pipe(rename({ suffix: tars.options.build.hash }))
        .pipe(gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)))
        .pipe(gulp.dest(`${tars.config.devPath}${tars.config.fs.staticFolderName}/css/`))
        .pipe(browserSync.reload({ stream: true, match: '**/*.css' }))
        .pipe(notifier.success(successMessage));
};
