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
            tars.say('It seems, that you use old version of TARS-CLI, and some packages are not available.');
            tars.say('Update TARS-CLI via "tars update".');
            tars.say('Please, write to the tars.builder@gmail.com, if update did\'t help you.');
            throw new Error('Current version or TARS-CLI is too old for downloaded TARS');
        }

    } else {
        requirePackage = require(packageName);
    }

    return requirePackage;
}

// TARS is a global var
global.tars = {
    require: tarsRequire,
    cli: (process.env.npmRoot ? true : false)
};

var gutil = tars.require('gulp-util');
var os = require('os');
var tarsConfig = require('../tars-config');

var helpersDirPath = './helpers';

var templaterName;
var templaterExtension = 'jade';
var preprocessor;
var templaterFn;
var cssPreprocName = tarsConfig.cssPreprocessor.toLowerCase();
var cssPreprocExtension = cssPreprocName;
var cssPreprocMainExtension = cssPreprocExtension;

var buildVersion = require(helpersDirPath + '/set-build-version')();
var buildOptions = {};

/**
 * Log messages from TARS
 * @param  {String} message Message to say
 */
tars.say = function say(message) {
    if (os.platform() === 'darwin') {
        console.log(gutil.colors.cyan.bold('🅃 🄰 🅁 🅂 : ') + gutil.colors.white.bold(message));
    } else {
        console.log(gutil.colors.cyan.bold('[ TARS ]: ') + gutil.colors.white.bold(message));
    }
};

/**
 * Log info about skipped task
 * @param  {String} taskName Skipped task name
 * @param  {String} reason   Reason ot the skip
 */
tars.skipTaskLog = function skipTaskLog(taskName, reason) {
    gutil.log(gutil.colors.white.bold('Skipped  \'' + gutil.colors.cyan(taskName) + '\' ' + reason));
};

if (cssPreprocName === 'stylus') {
    cssPreprocExtension = 'styl';
    cssPreprocMainExtension = 'styl';
} else if (cssPreprocName === 'scss') {
    cssPreprocExtension = '{scss,sass}';
}

// Generate build version
if (tarsConfig.useBuildVersioning) {
    buildOptions.buildVersion = buildVersion;
    buildOptions.buildPath = tarsConfig.buildPath + 'build' + buildOptions.buildVersion + '/';
} else {
    buildOptions.buildVersion = '';
    buildOptions.buildPath = tarsConfig.buildPath;
}

// EXPORTING

// Tars config
tars.config = tarsConfig;

// Flags
tars.flags = gutil.env;

// Generate start screen
require(helpersDirPath + '/start-screen-generator')(gutil);

// Required packages
tars.packages = {
    autoprefixer: tars.require('autoprefixer'),
    babel: tars.require('gulp-babel'),
    browserSync: tars.require('browser-sync'),
    cache: tars.require('gulp-cached'),
    changed: tars.require('gulp-changed'),
    chokidar: tars.require('chokidar'),
    concat: tars.require('gulp-concat'),
    csso: tars.require('gulp-csso'),
    data: tars.require('gulp-data'),
    del: tars.require('del'),
    digits: tars.require('digits'),
    download: tars.require('download'),
    eslint: tars.require('gulp-eslint'),
    gulp: require('gulp'),
    gulpif: tars.require('gulp-if'),
    gutil: gutil,
    handlebars: tars.require('handlebars'),
    htmlMin: tars.require('gulp-minify-html'),
    htmlPrettify: tars.require('gulp-html-prettify'),
    imagemin: tars.require('gulp-imagemin'),
    importify: tars.require('gulp-importify'),
    mkdirp: tars.require('mkdirp'),
    ncp: tars.require('ncp'),
    notify: tars.require('gulp-notify'),
    plumber: tars.require('gulp-plumber'),
    postcss: tars.require('gulp-postcss'),
    rename: tars.require('gulp-rename'),
    replace: tars.require('gulp-replace-task'),
    runSequence: tars.require('run-sequence'),
    sourcemaps: tars.require('gulp-sourcemaps'),
    spritesmith: tars.require('gulp.spritesmith'),
    stripDebug: tars.require('gulp-strip-debug'),
    svg2png: tars.require('gulp-svg2png'),
    svgspritesheet: tars.require('gulp-svg-spritesheet'),
    streamCombiner: tars.require('stream-combiner'),
    through2: tars.require('through2'),
    uglify: tars.require('gulp-uglify'),
    zip: tars.require('gulp-zip')
};

// Links to helpers
tars.helpers = {
    buildVersion: buildVersion,
    dateFormatter: require(helpersDirPath + '/modify-date-formatter'),
    fileLoader: require(helpersDirPath + '/file-loader'),
    notifier: require(helpersDirPath + '/notifier'),
    setUlimit: require(helpersDirPath + '/set-ulimit'),
    watcherLog: require(helpersDirPath + '/watcher-log'),
    skipTaskWithEmptyPipe: require(helpersDirPath + '/skip-task-with-empty-pipe')
};

templaterName = require(helpersDirPath + '/templater-name-setter')();

// Set template's extension
if (templaterName === 'handlebars') {
    templaterExtension = '{html,hbs}';
} else {
    templaterExtension = 'jade';
}

// Set preprocessor function
switch (cssPreprocName) {
    case 'scss':
        preprocessor = function () {
            return tars.require('gulp-sass')({
                outputStyle: 'expanded',
                includePaths: process.cwd()
            });
        };
        break;
    case 'stylus':
        preprocessor = function () {
            return tars.require('gulp-stylus')({
                'resolve url': true,
                'include css': true
            });
        };
        break;
    case 'less':
        preprocessor = function () {
            return tars.require('gulp-less')({
                path: [process.cwd()]
            });
        };
        break;
    default:
        break;
}

// Set templater function
switch (templaterName) {
    case 'handlebars':
        templaterFn = function (modulesData) {
            return tars.require('gulp-compile-handlebars')(modulesData, {
                batch: ['./markup/modules'],
                helpers: require('./tasks/html/helpers/handlebars-helpers.js')
            });
        };
        break;
    case 'jade':
        templaterFn = function (modulesData) {
            return tars.require('gulp-jade')({
                pretty: true,
                locals: modulesData
            });
        };
        break;
    default:
        break;
}

// Info about templater
tars.templater = {
    name: templaterName,
    ext: templaterExtension,
    fn: templaterFn
};

// Info about css preprocessor
tars.cssPreproc = {
    name: cssPreprocName,
    ext: cssPreprocExtension,
    mainExt: cssPreprocMainExtension,
    preprocessor: preprocessor
};

// Build options
tars.options = {
    notify: true,
    build: {
        hash: tars.flags.release ? Math.random().toString(36).substring(7) : '',
        path: buildOptions.buildPath,
        version: buildOptions.buildVersion
    }
};
