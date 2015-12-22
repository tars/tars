'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var gulpif = tars.packages.gulpif;
var concat = tars.packages.concat;
var autoprefixer = tars.packages.autoprefixer;
var postcss = tars.packages.postcss;
var replace = tars.packages.replace;
var sourcemaps = tars.packages.sourcemaps;
var plumber = tars.packages.plumber;
var importify = tars.packages.importify;
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;

module.exports = function generateTaskContent(browser) {

    var postProcessors = [];
    var preprocExtensions = tars.cssPreproc.ext;
    var preprocName = tars.cssPreproc.name;
    var stylesFolderPath = './markup/' + tars.config.fs.staticFolderName + '/' + preprocName;
    var sourceMapsDest = tars.config.sourcemaps.css.inline ? '' : '.';
    var generateSourceMaps;

    var stylesFilesToConcatinate = [];
    var firstStylesFilesToConcatinate = [
        stylesFolderPath + '/normalize.' + preprocExtensions,
        stylesFolderPath + '/libraries/**/*.' + preprocExtensions,
        stylesFolderPath + '/libraries/**/*.css',
        stylesFolderPath + '/mixins.' + preprocExtensions,
        stylesFolderPath + '/sprites-' + preprocName + '/sprite_96.' + preprocExtensions
    ];
    var generalStylesFilesToConcatinate = [
        stylesFolderPath + '/fonts.' + preprocExtensions,
        stylesFolderPath + '/vars.' + preprocExtensions,
        stylesFolderPath + '/GUI.' + preprocExtensions,
        stylesFolderPath + '/common.' + preprocExtensions,
        stylesFolderPath + '/plugins/**/*.' + preprocExtensions,
        stylesFolderPath + '/plugins/**/*.css',
        './markup/modules/*/*.' + preprocExtensions,
        './markup/modules/*/*.css'
    ];
    var lastStylesFilesToConcatinate = [
        stylesFolderPath + '/etc/**/*.' + preprocExtensions,
        stylesFolderPath + '/etc/**/*.css',
        '!./**/_*.' + preprocExtensions,
        '!./**/_*.css',
    ];

    var capitalizePreprocName = preprocName.charAt(0).toUpperCase() + preprocName.slice(1);
    var successMessage = capitalizePreprocName + '-files have been compiled';
    var errorMessage = 'An error occurred while compiling css';
    var compiledFileName = 'main';

    if (tars.config.postcss && tars.config.postcss.length) {
        tars.config.postcss.forEach(function (postProcessor) {
            postProcessors.push(require(postProcessor.name)(postProcessor.options));
        });
    }

    if (preprocName === 'less' || preprocName === 'stylus') {
        firstStylesFilesToConcatinate.push(
            stylesFolderPath + '/sprites-' + preprocName + '/sprite-png.' + preprocExtensions
        );
    }

    browser = browser || '';

    switch (browser) {
        case 'ie8':
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate,
                stylesFolderPath + '/sprites-' + preprocName + '/svg-fallback-sprite.' + preprocExtensions,
                stylesFolderPath + '/sprites-' + preprocName + '/sprite-ie.' + preprocExtensions,
                generalStylesFilesToConcatinate,
                './markup/modules/*/ie/ie8.' + preprocExtensions,
                './markup/modules/*/ie/ie8.css',
                lastStylesFilesToConcatinate
            );

            postProcessors.push(
                autoprefixer({browsers: ['ie 8']})
            );

            generateSourceMaps = false;

            compiledFileName += '_' + browser;

            successMessage = capitalizePreprocName + '-files for IE8 have been compiled';
            errorMessage = 'An error occurred while compiling css for IE8.';

            break;
        case 'ie9':
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate
            );

            if (tars.config.useSVG) {
                stylesFilesToConcatinate.push(
                    stylesFolderPath + '/sprites-' + preprocName + '/svg-sprite.' + preprocExtensions
                );
            }

            stylesFilesToConcatinate.push(
                generalStylesFilesToConcatinate,
                './markup/modules/*/ie/ie9.' + preprocExtensions,
                './markup/modules/*/ie/ie9.css',
                lastStylesFilesToConcatinate
            );

            postProcessors.push(
                autoprefixer({browsers: ['ie 9']})
            );

            compiledFileName += '_' + browser;

            generateSourceMaps = false;

            successMessage = capitalizePreprocName + '-files for IE9 have been compiled';
            errorMessage = 'An error occurred while compiling css for IE9.';

            break;
        // Styles for all browsers except IE8, IE9
        default:
            stylesFilesToConcatinate.push(
                firstStylesFilesToConcatinate
            );

            if (tars.config.useSVG) {
                stylesFilesToConcatinate.push(
                    stylesFolderPath + '/sprites-' + preprocName + '/svg-sprite.' + preprocExtensions
                );
            }

            stylesFilesToConcatinate.push(
                generalStylesFilesToConcatinate,
                lastStylesFilesToConcatinate
            );

            if (tars.config.autoprefixerConfig) {
                postProcessors.push(
                    autoprefixer({browsers: tars.config.autoprefixerConfig})
                );
            }

            generateSourceMaps = tars.config.sourcemaps.css.active && !tars.flags.release && !tars.flags.min;

            break;
    };

    stylesFilesToConcatinate = [].concat.apply([], stylesFilesToConcatinate);

    return gulp.src(stylesFilesToConcatinate, { base: process.cwd() })
        .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
        .pipe(plumber({
            errorHandler: function (error) {
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
                    match: '%=staticPrefixForCss=%',
                    replacement: tars.config.staticPrefixForCss()
                }, {
                    match: '%=static=%',
                    replacement: tars.config.staticPrefixForCss()
                }
            ],
            usePrefix: false
        }))
        .pipe(postcss(postProcessors))
        .pipe(concat(compiledFileName + tars.options.build.hash + '.css'))
        .pipe(gulpif(generateSourceMaps, sourcemaps.write(sourceMapsDest)))
        .pipe(gulp.dest('./dev/' + tars.config.fs.staticFolderName + '/css/'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(
            notifier.success(successMessage)
        );
};
