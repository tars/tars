var gulp = require('gulp'),                                     // Gulp JS
    uglify = require('gulp-uglifyjs'),                          // JS minify
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator');    

// Compress js-files
module.exports = function() {

    gulp.src('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/js/main.js')
        .pipe(uglify('main.min.js', {
            mangle: false
        }))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/js/'))
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
};   