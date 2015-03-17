var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/data/data.js'
                    ];

if (tarsConfig.lintJsCodeBeforeModules) {
    tarsConfig.jsPathsToConcatBeforeModulesJs.forEach(function(path) {
        jsPathsToLint.push(path)
    });
}

if (tarsConfig.lintJsCodeAfterModules) {
    tarsConfig.jsPathsToConcatAfterModulesJs.forEach(function(path) {
        jsPathsToLint.push(path)
    });
}

/**
 * Check JS for style and errors (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('js:check', function(cb) {
        if (tarsConfig.useJsLintAndHint) {
            return gulp.src(jsPathsToLint)
                .pipe(cache('hinting'))
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jscs())
                .on('error', notify.onError(function (error) {
                    return 'An error occurred while checking js.\nLook in the console for details.\n';
                }));
        } else {
            gutil.log('!JS-style-check and hinting is not used!');
            cb(null);
        }
    });
};