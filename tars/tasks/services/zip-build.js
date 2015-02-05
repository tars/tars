var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var zip = require('gulp-zip');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modify-date-formatter');

/**
 * Create zip archive of build
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('zip-build', function(cb) {
        if (tarsConfig.useArchiver) {
            return gulp.src(buildOptions.buildPath + '**', { base : "." })
                .pipe(zip('build' + buildOptions.buildVersion + '.zip'))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while creating zip-archive.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(buildOptions.buildPath))
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