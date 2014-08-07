var gulp = require('gulp'),                                     // Gulp JS
    jshint = require('gulp-jshint'),                            // JS linter
    cache = require('gulp-cached'),                             // Gulp cache module
    jscs = require('gulp-jscs'),                                // JS-style checker
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Check JS (code style and errors)
module.exports = function() {

    return gulp.src('./markup/modules/**/*.js')
        .pipe(cache('linting'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs())
        .on('error', notify.onError(function (error) {
            return 'There are some errors in JS.\nLook in console!';
        }))
};   