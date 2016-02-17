'use strict';

const gulp = tars.packages.gulp;
const replace = tars.packages.replace;
const plumber = tars.packages.plumber;
const rename = tars.packages.rename;
const through2 = tars.packages.through2;
const fs = require('fs');
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const generateStaticPath = require(tars.root + '/tasks/html/helpers/generate-static-path');

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
 * Concat all data for all modules to one file
 * @return {Object} Object with data for modules
 */
function concatModulesData() {
    let dataEntry;
    let readyModulesData;

    try {
        dataEntry = fs.readFileSync('./dev/temp/modulesData.js', 'utf8');
    } catch (er) {
        dataEntry = false;
    }

    if (dataEntry) {
        eval('readyModulesData = {' + dataEntry + '}');
        traverseThroughObject(readyModulesData, readyModulesData);
    } else {
        readyModulesData = '{}';
    }

    // Add helpers for Jade into readyModulesData in case of using Jade as templater
    if (tars.templater.name === 'jade') {
        readyModulesData = Object.assign(readyModulesData, {
            jadeHelpers: require(tars.root + '/tasks/html/helpers/jade-helpers')
        });
    }

    return readyModulesData;
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
        replacement: tars.flags.min || tars.flags.release ? '.min' : ''
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
                    return fs.readFileSync('./dev/temp/svg-symbols' + tars.options.build.hash + '.svg', 'utf8');
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
 * HTML compilation of pages templates.
 * Templates with _ prefix won't be compiled
 */
module.exports = () => {
    return gulp.task('html:compile-templates', () => {
        let modulesData;
        let error;
        let compileError;

        try {
            modulesData = concatModulesData();
        } catch (er) {
            error = er;
            modulesData = false;
        }

        return gulp.src(['./markup/pages/**/*.' + tars.templater.ext,
                         '!./markup/pages/**/_*.' + tars.templater.ext])
            .pipe(plumber({
                errorHandler(pipeError) {
                    notifier.error('An error occurred while compiling to html.', pipeError);
                    this.emit('end');
                    compileError = true;
                }
            }))
            .pipe(
                modulesData
                    ? tars.templater.fn(modulesData)
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
                pathToFileToRename.extname = '.html';
            }))
            .pipe(gulp.dest('./dev/'))
            .on('end', () => {
                if (!compileError) {
                    browserSync.reload();
                    notifier.success('Templates\'ve been compiled');
                }
            });
    });
};
