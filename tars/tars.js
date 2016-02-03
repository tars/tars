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

    if (process.env.npmRoot) {
        try {
            return require(process.env.npmRoot + packageName);
        } catch (error) {
            console.log('\n\n');
            tars.say('It seems, that TARS in current project is not compatible with current TARS-CLI!');
            tars.say(`'Package ${packageName} is not available.`);
            tars.say('Update TARS-CLI via "tars update" and your project via "tars update-project"');
            tars.say('Please, write to the tars.builder@gmail.com, if update did\'t help you.');

            throw new Error(`'Package ${packageName} is not available.`);
        }

    }

    return require(packageName);
}

// TARS is a global var
global.tars = {
    require: tarsRequire,
    cli: (process.env.npmRoot ? true : false),
    root: __dirname,
    config: require('../tars-config')
};

const gutil = tars.require('gulp-util');
const os = require('os');
const helpersDirPath = './helpers';
const cssPreprocName = tars.config.cssPreprocessor.toLowerCase();
const templaterName = require(helpersDirPath + '/get-templater-name')(tars.config.templater.toLowerCase());
const buildVersion = require(helpersDirPath + '/set-build-version')();
const useBuildVersioning = tars.config.useBuildVersioning;

// Flags
tars.flags = gutil.env;

// Dev mode flag
tars.isDevMode = !tars.flags.release && !tars.flags.min;

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
// We have to call it here, cause it has to be before all actions
require(helpersDirPath + '/start-screen-generator')(gutil);

// Set ulimit to 4096 for *nix FS. It needs to work with big amount of files
// But you can set any value in config
if (os.platform() !== 'win32') {
    require(helpersDirPath + '/set-ulimit')();
}

/**
 * Log info about skipped task
 * @param  {String} taskName Skipped task name
 * @param  {String} reason   Reason ot the skip
 */
tars.skipTaskLog = function skipTaskLog(taskName, reason) {
    gutil.log(gutil.colors.white.bold('Skipped  \'' + gutil.colors.cyan(taskName) + '\' ' + reason));
};

/**
 * Beginning of a path for static files for using in css
 * You have to use %=static=% or __static__ placeholder in paths to static in css files
 * Example: background: url('%=static=%logo.png');
 * Will be replaced to background: url('../img/logo.png');
 * %=staticPrefixForCss=% prefix works, but it is deprecated!
 */
tars.config.staticPrefixForCss = '../' + tars.config.fs.imagesFolderName + '/';

// Fix svg config
if (tars.config.hasOwnProperty('useSVG')) {
    tars.config.svg = {
        active: tars.config.useSVG,
        workflow: 'sprite'
    };
} else {
    const symbolsLoadingType = tars.config.svg.symbolsConfig.loadingType;

    if (
        symbolsLoadingType !== 'inject' &&
        symbolsLoadingType !== 'separate-file-with-link' &&
        symbolsLoadingType !== 'separate-file'
    ) {
        tars.say(
            gutil.colors.yellow(
                `TARS does not support option ${tars.config.svg.symbolsConfig.loadingType} for symbols loading`
            )
        );
        tars.say(
            gutil.colors.yellow(
                'You can use only "inject", "separate-file" and "separate-file-with-link"'
            )
        );
        tars.say(
            gutil.colors.yellow(
                '"inject" will be used now!'
            )
        );
        tars.config.svg.symbolsConfig.loadingType = 'inject';
    }
}

if (tars.config.svg.active && tars.config.svg.workflow === 'symbols' && (tars.flags.ie || tars.flags.ie8)) {
    tars.say(
        gutil.colors.yellow(
            'Build for IE8 is not available, then svg-symbols is used!'
        )
    );
}

// Build options
tars.options = {
    notify: true,
    build: {
        hash: tars.flags.release ? Math.random().toString(36).substring(7) : '',
        path: useBuildVersioning ? tars.config.buildPath + 'build' + buildVersion + '/' : tars.config.buildPath,
        version: useBuildVersioning ? buildVersion : ''
    },
    watch: {
        ignored: '',
        persistent: true,
        ignoreInitial: true
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
    watcherLog: require(helpersDirPath + '/watcher-log'),
    skipTaskWithEmptyPipe: require(helpersDirPath + '/skip-task-with-empty-pipe'),
    stringHelper: require(helpersDirPath + '/string-helper')
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
            preprocessor: () => tars.require('gulp-stylus')({
                'resolve url': true,
                'include css': true
            })
        };
        break;
    case 'less':
        tars.cssPreproc = {
            name: 'less',
            ext: 'less',
            mainExt: 'less',
            preprocessor: () => tars.require('gulp-less')({
                path: [process.cwd()]
            })
        };
        break;
    case 'scss':
    default:
        tars.cssPreproc = {
            name: 'scss',
            ext: '{scss,sass}',
            mainExt: 'scss',
            preprocessor: () => tars.require('gulp-sass')({
                outputStyle: 'expanded',
                includePaths: process.cwd()
            })
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
            fn: modulesData => tars.require('gulp-compile-handlebars')(modulesData, {
                batch: ['./markup/modules'],
                helpers: require('./tasks/html/helpers/handlebars-helpers.js')
            })
        };
        break;
    case 'jade':
    default:
        tars.templater = {
            name: 'jade',
            ext: 'jade',
            fn: modulesData => tars.require('gulp-jade')({
                pretty: true,
                locals: modulesData
            })
        };
        break;
}
