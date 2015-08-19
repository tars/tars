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
        return require(process.env.npmRoot + packageName);
    } else {
        return require(packageName);
    }
}

global.tars = {
    require: tarsRequire
};

var gutil = tars.require('gulp-util');
var tarsConfig = require('../tars-config');
var templaterName;
var templaterExtension = 'jade';
var cssPreprocName = tarsConfig.cssPreprocessor.toLowerCase();
var cssPreprocExtension = cssPreprocName;
var buildVersion = require('./helpers/set-build-version')();
var buildOptions = {};

if (cssPreprocName === 'stylus') {
    cssPreprocExtension = 'styl';
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

// Required packages
tars.packages = {
    gulp: require('gulp'),
    gutil: gutil,
    runSequence: tars.require('run-sequence'),
    browserSync: tars.require('browser-sync'),
    notify: tars.require('gulp-notify'),
    concat: tars.require('gulp-concat'),
    gulpif: tars.require('gulp-if'),
    cache: tars.require('gulp-cached'),
    changed: tars.require('gulp-changed'),
    chokidar: tars.require('chokidar'),
    handlebars: tars.require('gulp-compile-handlebars/node_modules/handlebars'),
    gulpHandlebars: tars.require('gulp-compile-handlebars'),
    digits: tars.require('digits'),
    sass: tars.require('gulp-sass'),
    autoprefixer: tars.require('gulp-autoprefixer'),
    replace: tars.require('gulp-replace-task'),
    addsrc: tars.require('gulp-add-src'),
    csso: tars.require('gulp-csso'),
    rename: tars.require('gulp-rename'),
    spritesmith: tars.require('gulp.spritesmith'),
    svgspritesheet: tars.require('gulp-svg-spritesheet'),
    svg2png: tars.require('gulp-svg2png'),
    through2: tars.require('through2'),
    htmlMin: tars.require('gulp-minify-html'),
    imagemin: tars.require('gulp-imagemin'),
    jshint: tars.require('gulp-jshint'),
    jscs: tars.require('gulp-jscs'),
    uglify: tars.require('gulp-uglify'),
    streamCombiner: tars.require('stream-combiner'),
    stripDebug: tars.require('gulp-strip-debug'),
    sourcemaps: tars.require('gulp-sourcemaps');
    del: tars.require('del'),
    mkdirp: tars.require('mkdirp'),
    ncp: tars.require('ncp'),
    download: tars.require('download'),
    plumber: tars.require('gulp-plumber'),
    zip: tars.require('gulp-zip')
}

// Links to helpers
tars.helpers = {
    buildVersion: buildVersion,
    setUlimit: require('./helpers/set-ulimit'),
    fileLoader: require('./helpers/file-loader'),
    notifier: require('./helpers/notifier'),
    watcherLog: require('./helpers/watcher-log'),
    dateFormatter: require('./helpers/modify-date-formatter.js')
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
    build: {
        version: buildOptions.buildVersion,
        path: buildOptions.buildPath,
        hash: tars.flags.release ? Math.random().toString(36).substring(7) : ''
    }
}
