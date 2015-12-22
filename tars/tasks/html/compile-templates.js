'use strict';

var gulp = tars.packages.gulp;
var replace = tars.packages.replace;
var plumber = tars.packages.plumber;
var rename = tars.packages.rename;
var through2 = tars.packages.through2;
var fs = require('fs');
var notifier = tars.helpers.notifier;
var browserSync = tars.packages.browserSync;
var patterns = [];

/**
 * Traverse recursively through data-object
 * If any property is a funciton,
 * this function will be called
 * @param  {Object} obj     Current object to traverse in current step
 * @param  {Object} context Object with all data
 */
function traverseThroughObject(obj, context) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === 'object') {
                traverseThroughObject(obj[property], context);
            }

            if (typeof obj[property] === 'function') {
                obj[property] = obj[property].call(context);
            }
        }
    }
}

/**
 * Concat all data for all modules to one file
 * @return {Object} Object with data for modules
 */
function concatModulesData() {
    var dataEntry;
    var readyModulesData;

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

    return readyModulesData;
}

if (!tars.flags.ie8 && !tars.flags.ie) {
    patterns.push(
        {
            match: '<link href="%=staticPrefix=%css/main_ie8%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
            replacement: ''
        }, {
            match: '<link href="%=static=%css/main_ie8%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
            replacement: ''
        }
    );
}

if (!tars.flags.ie9 && !tars.flags.ie) {
    patterns.push(
        {
            match: '<link href="%=staticPrefix=%css/main_ie9%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
            replacement: ''
        }, {
            match: '<link href="%=static=%css/main_ie9%=hash=%%=min=%.css" rel="stylesheet" type="text/css">',
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
    }, {
        match: '%=staticPrefix=%',
        replacement: tars.config.staticPrefix
    }, {
        match: '%=static=%',
        replacement: tars.config.staticPrefix
    }
);

/**
 * HTML compilation of pages templates.
 * Templates with _ prefix won't be compiled
 */
module.exports = function () {
    return gulp.task('html:compile-templates', function () {
        var modulesData;
        var error;

        try {
            modulesData = concatModulesData();
        } catch (er) {
            error = er;
            modulesData = false;
        }

        return gulp.src(['./markup/pages/**/*.' + tars.templater.ext,
                         '!./markup/pages/**/_*.' + tars.templater.ext])
            .pipe(plumber({
                errorHandler: function (pipeError) {
                    notifier.error('An error occurred while compiling to html.', pipeError);
                    this.emit('end');
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
            .pipe(rename(function (pathToFileToRename) {
                pathToFileToRename.extname = '.html';
            }))
            .pipe(gulp.dest('./dev/'))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Templates\'ve been compiled')
            );
    });
};
