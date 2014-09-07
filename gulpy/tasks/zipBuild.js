var gulp = require('gulp'),                                             // Gulp JS
    gulpif = require('gulp-if'),                                        // Gulp if module
    zip = require('gulp-zip'),
    notify = require('gulp-notify'),                                    // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,         // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),             // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator');

// Create zip archive of build
module.exports = function() {

    return gulp.task('zip-build', function(cb) {
        gulp.src('./builds/build' + buildVersionGenerator.newBuildVersion +'/**', { base : "." })
            .pipe(zip('build' + buildVersionGenerator.newBuildVersion + '.zip'))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Zip-archive\'s been created\n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        cb(null);
    });
};   