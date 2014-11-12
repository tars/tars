var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var zip = require('gulp-zip');
var notify = require('gulp-notify');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');

/**
 * Create zip archive of build
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('zip-build', function(cb) {
        if (projectConfig.useArchiver) {
            return gulp.src('./builds/build' + buildOptions.buildVersion +'/**', { base : "." })
                .pipe(zip('build' + buildOptions.buildVersion + '.zip'))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while creating zip-archive.\nLook in the console for details.\n' + error;
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
            cb(null);
        }
    });
};