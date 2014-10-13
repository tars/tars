var gulp = require('gulp'),                                     // Gulp JS
    uglify = require('gulp-uglifyjs'),                          // JS minify
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

require('./stripDebug')();

// Compress js-files
module.exports = function(buildOptions) {

    return gulp.task('compress-main-js', ['strip-debug'], function() {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/js/main.js')
            .pipe(uglify('main.min.js', {
                mangle: false
            }))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/js/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'JS\'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};   