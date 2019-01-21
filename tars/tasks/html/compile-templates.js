'use strict';

const gulp = tars.packages.gulp;
const replace = tars.packages.replace;
const plumber = tars.packages.plumber;
const rename = tars.packages.rename;
const through2 = tars.packages.through2;
const fs = require('fs');
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const generateStaticPath = require(`${tars.root}/tasks/html/helpers/generate-static-path`);
const templaterName = require(`${tars.root}/helpers/get-templater-name`)(tars.config.templater.toLowerCase());
const templaterIsPugOrJade = templaterName === 'jade' || templaterName === 'pug';

let patterns = [];

/**
 * Traverse recursively through data-object
 * If any property is a funciton,
 * this function will be called
 * @param  {Object} obj      Current object to traverse in current step
 * @param  {Object} fullData Object with all data
 */
function traverseThroughObject(obj, fullData) {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === 'object') {
                traverseThroughObject(obj[property], fullData);
            }

            if (typeof obj[property] === 'function') {
                obj[property] = obj[property].call(null, fullData);
            }
        }
    }
}

/**
 * Concat all data for all components to one file
 * @return {Object} Object with data for components
 */
function concatComponentsData() {
    let dataEntry;
    let readyMocksData;

    try {
        dataEntry = fs.readFileSync(`${tars.config.devPath}temp/mocksData.js`, 'utf8');
    } catch (er) {
        dataEntry = false;
    }

    if (dataEntry) {
        eval(`readyMocksData = {${dataEntry}}`);
        // readyMocksData passed as second argument
        // to be an argument for each function from data
        traverseThroughObject(readyMocksData, readyMocksData);
    } else {
        readyMocksData = '{}';
    }

    // Add helpers for Jade and Pug into readyMocksData in case of using Jade as templater
    if (templaterIsPugOrJade) {
        readyMocksData = Object.assign(readyMocksData, {
            [`${templaterName}Helpers`]: require(`${tars.root}/tasks/html/helpers/${templaterName}-helpers`)
        });
    }

    return readyMocksData;
}

if (!tars.flags.ie8 && !tars.flags.ie) {
    patterns.push(
        {
            match: /<!--\[if IE 8.*endif\]-->|<!--\[if lt IE 9.*endif\]-->/gm,
            replacement: ''
        }
    );
}

if (!tars.flags.ie9 && !tars.flags.ie) {
    patterns.push(
        {
            match: /<!--\[if IE 9.*endif\]-->/gm,
            replacement: ''
        }
    );
}

patterns.push(
    {
        match: '%=min=%',
        replacement: tars.flags.min || tars.flags.release || tars.flags.m ? '.min' : ''
    }, {
        match: '%=hash=%',
        replacement: tars.flags.release ? tars.options.build.hash : ''
    }
);

if (
    tars.config.svg.active && tars.config.svg.workflow === 'symbols' &&
    tars.config.svg.symbolsConfig.loadingType === 'inject'
) {
    patterns.push(
        {
            match: '%=symbols=%',
            replacement: (() => {

                /* eslint-disable no-unused-vars */

                try {
                    return fs.readFileSync(`${tars.config.devPath}temp/svg-symbols${tars.options.build.hash}.svg`, 'utf8');
                } catch (error) {
                    return '';
                }

                /* eslint-enable no-unused-vars */
            })
        }
    );
} else {
    patterns.push(
        {
            match: '%=symbols=%',
            replacement: ''
        }
    );
}

if (
    !tars.config.svg.active || tars.config.svg.workflow !== 'symbols' ||
    tars.config.svg.symbolsConfig.loadingType !== 'separate-file-with-link' ||
    !tars.config.svg.symbolsConfig.usePolyfillForExternalSymbols
) {
    patterns.push(
        {
            match: '<script src="%=static=%js/separate-js/svg4everybody.min.js"></script>',
            replacement: ''
        }, {
            match: '<script>svg4everybody();</script>',
            replacement: ''
        }
    );
}

/**
 * Add some specific functions for Jade/Pug-processing
 * @return {Pipe}
 */
function jadeAndPugInheritanceProcessing() {
    const inheritanceOptions = {
        basedir: './markup/',
        extension: `.${templaterName}`,
        skip: ['node_modules']
    };
    const isInheritanceEnabled = tars.options.watch.isActive && templaterIsPugOrJade;

    if (isInheritanceEnabled) {
        return tars.packages.streamCombiner(
            tars.packages.cache('templates'),
            tars.require(`gulp-${templaterName}-inheritance`)(inheritanceOptions),
            tars.helpers.filterFilesByPath([
                new RegExp(`\/markup\/${tars.config.fs.componentsFolderName}\/`),
                /^_[\w]+.(jade|pug)/
            ])
        );
    }

    return tars.packages.gutil.noop();
}

/**
 * HTML compilation of pages templates.
 * Templates with _ prefix won't be compiled
 */
module.exports = () => {
    return gulp.task('html:compile-templates', () => {
        let mocksData;
        let error;
        let compileError;
        let filesToCompile = [
            `./markup/pages/**/*.${tars.templater.ext}`,
            `!./markup/pages/**/_*.${tars.templater.ext}`
        ];

        if (templaterIsPugOrJade && tars.options.watch.isActive) {
            filesToCompile.push(
                `!./markup/${tars.config.fs.componentsFolderName}/**/_*.${tars.templater.ext}`,
                `./markup/${tars.config.fs.componentsFolderName}/**/*.${tars.templater.ext}`
            );
        }

        try {
            mocksData = concatComponentsData();
        } catch (er) {
            error = er;
            mocksData = false;
        }

        return gulp.src(filesToCompile)
            .pipe(plumber({
                errorHandler(pipeError) {
                    notifier.error('An error occurred while compiling to html.', pipeError);
                    this.emit('end');
                    compileError = true;
                }
            }))
            .pipe(jadeAndPugInheritanceProcessing())
            .pipe(
                mocksData
                    ? tars.templater.fn(mocksData)
                    : through2.obj(
                        function () {
                            /* eslint-disable no-invalid-this */

                            this.emit('error', new Error('An error occurred with data-files!\n' + error));

                            /* eslint-enable no-invalid-this */
                        }
                    )
            )
            .pipe(replace({
                patterns: patterns,
                usePrefix: false
            }))
            .pipe(generateStaticPath())
            .pipe(rename(pathToFileToRename => {

                if (templaterIsPugOrJade) {
                    pathToFileToRename.dirname = pathToFileToRename.dirname.replace(/^pages/, '');
                }

                pathToFileToRename.extname = '.html';
            }))
            .pipe(gulp.dest(`${tars.config.devPath}`))
            .on('end', () => {
                if (!compileError) {
                    browserSync.reload();
                    notifier.success('Templates\'ve been compiled', { notStream: true });
                }
            });
    });
};
