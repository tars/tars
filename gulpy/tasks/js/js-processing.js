var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-сonfig');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');
var browserSync = require('browser-sync');

var jsPaths = [
        './markup/' + tarsConfig.fs.staticFolderName + '/js/libraries/**/*.js',
        './markup/' + tarsConfig.fs.staticFolderName + '/js/plugins/**/*.js'
    ];

    if (tarsConfig.jsPathsToConcatBeforeModulesJs.length) {
        tarsConfig.jsPathsToConcatBeforeModulesJs.forEach(function(path) {
            jsPaths.push(path)
        });
    }

    jsPaths.push('./markup/modules/**/*.js');

    if (tarsConfig.jsPathsToConcatAfterModulesJs.length) {
        tarsConfig.jsPathsToConcatAfterModulesJs.forEach(function(path) {
            jsPaths.push(path)
        });
    }

    jsPaths.push('!./markup/modules/**/mData.js');

require('./lint')();

/**
 * Concat JS for modules, libs and plugins in common file. Also lint modules' js
 * @param  {objects} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('js-processing', ['lint'], function() {
        return gulp.src(jsPaths)
            .pipe(concat('main' + buildOptions.hash + '.js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while concating js-files.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/js'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'JS\'ve been linted and concatinated \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};