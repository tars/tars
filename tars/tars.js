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
            tars.say('Update TARS-CLI via ' + gutil.colors.cyan.bold('"tars update"') + '.');
            tars.say('Please, write to the tars.builder@gmail.com, if update did\'t help you.')
            throw new Error('Current version or TARS-CLI is too old for downloaded TARS');
        }

    } else {
        requirePackage = require(packageName);
    }

    return requirePackage;
}

/**
 * Check operation system name
 * @return {Boolean}
 */
function isWindows() {
    return (/^win/i).test(os.platform());
}

// TARS is a global var
global.tars = {
    require: tarsRequire,
    cli: (process.env.npmRoot ? true : false)
};

var gutil = tars.require('gulp-util');
var os = require('os');
var tarsConfig = require('../tars-config');
var templaterName;
var templaterExtension = 'jade';
var cssPreprocName = tarsConfig.cssPreprocessor.toLowerCase();
var cssPreprocExtension = cssPreprocName;
var buildVersion = require('./helpers/set-build-version')();
var buildOptions = {};

tars.say = function say(message) {
    if (os.platform() === 'darwin') {
        console.log(gutil.colors.cyan.bold('🅃 🄰 🅁 🅂 : ') + gutil.colors.white.bold(message));
    } else {
        console.log(gutil.colors.cyan.bold('[ TARS ]: ') + gutil.colors.white.bold(message));
    }
};

if (cssPreprocName === 'stylus') {
    cssPreprocExtension = 'styl';
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
require('./helpers/start-screen-generator')(gutil);

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
    gulp: require('gulp'),
    gulpHandlebars: tars.require('gulp-compile-handlebars'),
    gulpif: tars.require('gulp-if'),
    gutil: gutil,
    handlebars: tars.require('handlebars'),
    htmlMin: tars.require('gulp-minify-html'),
    htmlPrettify: tars.require('gulp-html-prettify'),
    imagemin: tars.require('gulp-imagemin'),
    importify: tars.require('gulp-importify'),
    jade: tars.require('gulp-jade'),
    jscs: tars.require('gulp-jscs'),
    jshint: tars.require('gulp-jshint'),
    less: tars.require('gulp-less'),
    mkdirp: tars.require('mkdirp'),
    ncp: tars.require('ncp'),
    notify: tars.require('gulp-notify'),
    plumber: tars.require('gulp-plumber'),
    postcss: tars.require('gulp-postcss'),
    promisePolyfill: tars.require('es6-promise'),
    rename: tars.require('gulp-rename'),
    replace: tars.require('gulp-replace-task'),
    runSequence: tars.require('run-sequence'),
    sass: tars.require('gulp-sass'),
    sourcemaps: tars.require('gulp-sourcemaps'),
    spritesmith: tars.require('gulp.spritesmith'),
    stripDebug: tars.require('gulp-strip-debug'),
    stylus: tars.require('gulp-stylus'),
    svg2png: tars.require('gulp-svg2png'),
    svgspritesheet: tars.require('gulp-svg-spritesheet'),
    streamCombiner: tars.require('stream-combiner'),
    through2: tars.require('through2'),
    uglify: tars.require('gulp-uglify'),
    zip: tars.require('gulp-zip')
}

// Links to helpers
tars.helpers = {
    buildVersion: buildVersion,
    dateFormatter: require('./helpers/modify-date-formatter'),
    fileLoader: require('./helpers/file-loader'),
    notifier: require('./helpers/notifier'),
    setUlimit: require('./helpers/set-ulimit'),
    watcherLog: require('./helpers/watcher-log')
}

templaterName = require('./helpers/templater-name-setter')();

// Set template's extension
if (templaterName === 'handlebars') {
    templaterExtension = ['html', 'hbs'];
} else {
    templaterExtension = ['jade'];
}

// Info about templater
tars.templater = {
    name: templaterName,
    ext: templaterExtension
};

// Info about css preprocessor
tars.cssPreproc = {
    name: cssPreprocName,
    ext: cssPreprocExtension
}

// Build options
tars.options = {
    notify: true,
    build: {
        hash: tars.flags.release ? Math.random().toString(36).substring(7) : '',
        path: buildOptions.buildPath,
        version: buildOptions.buildVersion
    }
}
