var gulp = require('gulp'),                                     // Gulp JS
    gutil = require('gulp-util'),                               // Gulp util module
    jshint = require('gulp-jshint'),                            // JS linter
    cache = require('gulp-cached'),                             // Gulp cache module
    jscs = require('gulp-jscs'),                                // JS-style checker
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

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