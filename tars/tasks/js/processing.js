var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');

var jsPaths = [
        './markup/' + tarsConfig.fs.staticFolderName + '/js/framework/**/*.js',
        './markup/' + tarsConfig.fs.staticFolderName + '/js/libraries/**/*.js',
        './markup/' + tarsConfig.fs.staticFolderName + '/js/plugins/**/*.js'
    ];

    if (tarsConfig.jsPathsToConcatBeforeModulesJs.length) {
        tarsConfig.jsPathsToConcatBeforeModulesJs.forEach(function(path) {
            jsPaths.push(path)
        });
    }

    jsPaths.push('./markup/modules/*/*.js');

    if (tarsConfig.jsPathsToConcatAfterModulesJs.length) {
        tarsConfig.jsPathsToConcatAfterModulesJs.forEach(function(path) {
            jsPaths.push(path)
        });
    }

    jsPaths.push('!./markup/modules/**/data/data.js');

require('./check')();

/**
 * Concat JS for modules, libs and plugins in common file. Also lint modules' js
 * @param  {objects} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('js:processing', ['js:check'], function() {
        return gulp.src(jsPaths)
            .pipe(concat('main' + buildOptions.hash + '.js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while concating js-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/js'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                notifier('JS\'ve been linted and concatinated')
            );
    });
};