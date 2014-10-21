var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    zip = require('gulp-zip'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');


// Create zip archive of build
module.exports = function(buildOptions) {

    return gulp.task('zip-build', function(cb) {
        if (projectConfig.useArchiver) {
            gulp.src('./builds/build' + buildOptions.buildVersion +'/**', { base : "." })
            .pipe(zip('build' + buildOptions.buildVersion + '.zip'))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/'))
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
        } else {
            gutil.log('!Archiver is not used!');
        }
        
        cb(null);
    });
};   