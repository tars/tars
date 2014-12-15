var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Strip console.log and debugger from main.js (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('strip-debug', function(cb) {

        if (projectConfig.removeConsoleLog) {
            return gulp.src(buildOptions.buildPath + projectConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
                .pipe(stripDebug())
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while stripping debug.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(buildOptions.buildPath + projectConfig.fs.staticFolderName + '/js/'))
                .pipe(
                    gulpif(notifyConfig.useNotify,
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'JS is ready for minify \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );
        } else {
            gutil.log('!Strip debug is not used!');
            cb(null);
        }
    });
};