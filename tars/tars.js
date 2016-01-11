'use strict';

/**
 * Main module for TARS
 */

/**
 * Reqiure modules from TARS-CLI, if tars was executed via CLI and from local node_modules instead
 * @param  {String} packageName Name of the required package
 * @return {Object}             Required package
 */
function tarsRequire(packageName) {
    var requirePackage;

    if (process.env.npmRoot) {
        try {
            requirePackage = require(process.env.npmRoot + packageName);
        } catch (error) {
            console.log('\n\n');
            tars.say('It seems, that you use old version of TARS-CLI!');
            tars.say('Package ' + packageName + 'is not available.');
            tars.say('Update TARS-CLI via "tars update".');
            tars.say('Please, write to the tars.builder@gmail.com, if update did\'t help you.');

            throw new Error('Package ' + packageName + 'is not available.');
        }

    } else {
        requirePackage = require(packageName);
    }

    return requirePackage;
}

// TARS is a global var
global.tars = {
    require: tarsRequire,
    cli: (process.env.npmRoot ? true : false),
    root: __dirname
};

const gutil = tars.require('gulp-util');
const os = require('os');
const tarsConfig = require('../tars-config');
const helpersDirPath = './helpers';
const cssPreprocName = tarsConfig.cssPreprocessor.toLowerCase();
const templaterName = require(helpersDirPath + '/get-templater-name')(tarsConfig.templater.toLowerCase());
const buildVersion = require(helpersDirPath + '/set-build-version')();

var buildOptions = {};

// Tars config
tars.config = tarsConfig;

// Flags
tars.flags = gutil.env;

/**
 * Log messages from TARS
 * @param  {String} message Message to say
 */
tars.say = function say(message) {
    // Use «nice» output only for OSX
    if (os.platform() === 'darwin') {
        console.log(gutil.colors.cyan.bold('🅃 🄰 🅁 🅂 : ') + gutil.colors.white.bold(message));
    } else {
        console.log(gutil.colors.cyan.bold('[ TARS ]: ') + gutil.colors.white.bold(message));
    }
};

// Generate start screen
require(helpersDirPath + '/start-screen-generator')(gutil);

/**
 * Log info about skipped task
 * @param  {String} taskName Skipped task name
 * @param  {String} reason   Reason ot the skip
 */
tars.skipTaskLog = function skipTaskLog(taskName, reason) {
    gutil.log(gutil.colors.white.bold('Skipped  \'' + gutil.colors.cyan(taskName) + '\' ' + reason));
};

// Generate build version
if (tarsConfig.useBuildVersioning) {
    buildOptions.buildVersion = buildVersion;
    buildOptions.buildPath = tarsConfig.buildPath + 'build' + buildOptions.buildVersion + '/';
} else {
    buildOptions.buildVersion = '';
    buildOptions.buildPath = tarsConfig.buildPath;
}

// Build options
tars.options = {
    notify: true,
    build: {
        hash: tars.flags.release ? Math.random().toString(36).substring(7) : '',
        path: buildOptions.buildPath,
        version: buildOptions.buildVersion
    }
};

// Required packages
// There are only common packages
tars.packages = {
    autoprefixer: tars.require('autoprefixer'),
    browserSync: tars.require('browser-sync'),
    cache: tars.require('gulp-cached'),
    changed: tars.require('gulp-changed'),
    chokidar: tars.require('chokidar'),
    concat: tars.require('gulp-concat'),
    data: tars.require('gulp-data'),
    del: tars.require('del'),
    gulp: require('gulp'),
    gulpif: tars.require('gulp-if'),
    gutil: gutil,
    importify: tars.require('gulp-importify'),
    notify: tars.require('gulp-notify'),
    plumber: tars.require('gulp-plumber'),
    postcss: tars.require('gulp-postcss'),
    rename: tars.require('gulp-rename'),
    replace: tars.require('gulp-replace-task'),
    runSequence: tars.require('run-sequence'),
    sourcemaps: tars.require('gulp-sourcemaps'),
    streamCombiner: tars.require('stream-combiner'),
    through2: tars.require('through2')
};

// Links to helpers
tars.helpers = {
    buildVersion,
    dateFormatter: require(helpersDirPath + '/modify-date-formatter'),
    tarsFsHelper: require(helpersDirPath + '/tars-fs-helper'),
    notifier: require(helpersDirPath + '/notifier'),
    setUlimit: require(helpersDirPath + '/set-ulimit'),
    watcherLog: require(helpersDirPath + '/watcher-log'),
    skipTaskWithEmptyPipe: require(helpersDirPath + '/skip-task-with-empty-pipe')
};

/**
 * Info about css preprocessor
 * @type {String}   cssPreproc.name
 * @type {String}   cssPreproc.ext
 * @type {String}   cssPreproc.mainExt
 * @type {Function} cssPreproc.ext
 */
switch (cssPreprocName) {
    case 'stylus':
        tars.cssPreproc = {
            name: 'stylus',
            ext: 'styl',
            mainExt: 'styl',
            preprocessor: () => {
                return tars.require('gulp-stylus')({
                    'resolve url': true,
                    'include css': true
                });
            }
        };
        break;
    case 'less':
        tars.cssPreproc = {
            name: 'less',
            ext: 'less',
            mainExt: 'less',
            preprocessor: () => {
                return tars.require('gulp-less')({
                    path: [process.cwd()]
                });
            }
        };
        break;
    case 'scss':
    default:
        tars.cssPreproc = {
            name: 'scss',
            ext: '{scss,sass}',
            mainExt: 'scss',
            preprocessor: () => {
                return tars.require('gulp-sass')({
                    outputStyle: 'expanded',
                    includePaths: process.cwd()
                });
            }
        };
        break;
}

/**
 * Info about templater
 * @type {String}   templater.name
 * @type {String}   templater.ext
 * @type {Function} templater.fn
 */
switch (templaterName) {
    case 'handlebars':
        tars.packages.handlebars = tars.require('gulp-compile-handlebars').Handlebars;
        tars.templater = {
            name: 'handlebars',
            ext: '{html,hbs}',
            fn: modulesData => {
                return tars.require('gulp-compile-handlebars')(modulesData, {
                    batch: ['./markup/modules'],
                    helpers: require('./tasks/html/helpers/handlebars-helpers.js')
                });
            }
        };
        break;
    case 'jade':
    default:
        tars.templater = {
            name: 'jade',
            ext: 'jade',
            fn: modulesData => {
                return tars.require('gulp-jade')({
                    pretty: true,
                    locals: modulesData
                });
            }
        };
        break;
}
