var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    cache = require('gulp-cached'),
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

var jsPathsToLint = [
                     './markup/modules/**/*.js',
                     '!./markup/modules/**/_*.js',
                     '!./markup/modules/**/mData.js'
                    ];

if (projectConfig.lintJsCodeBeforeModules) {
    projectConfig.jsPathsToConcatBeforeModulesJs.forEach(function(path) {
        jsPathsToLint.push(path)
    });
}

if (projectConfig.lintJsCodeAfterModules) {
    projectConfig.jsPathsToConcatAfterModulesJs.forEach(function(path) {
        jsPathsToLint.push(path)
    });
}

// Check JS (code style and errors)
module.exports = function() {

    return gulp.task('lint', function() {
        if (projectConfig.useJsLintAndHint) {
            return gulp.src(jsPathsToLint)
            .pipe(cache('linting'))
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jscs())
            .on('error', notify.onError(function (error) {
                return 'There are some errors in JS.\nLook in console!';
            }));    
        } else {
            gutil.log('!JS-lint and hint is not used!');
        }
    });
};   