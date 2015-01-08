var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/mData.js'
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

    return gulp.task('lint', function(cb) {
        if (tarsConfig.useJsLintAndHint) {
            return gulp.src(jsPathsToLint)
                .pipe(cache('linting'))
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jscs())
                .on('error', notify.onError(function (error) {
                    return 'An error occurred while linting js.\nLook in the console for details.\n';
                }));
        } else {
            gutil.log('!JS-lint and hint is not used!');
            cb(null);
        }
    });
};