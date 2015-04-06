var gulp = require('gulp');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');

/**
 * Create zip archive of build
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('service:zip-build', function(cb) {
        if (tarsConfig.useArchiver) {
            return gulp.src(buildOptions.buildPath + '**', { base: '.' })
                .pipe(zip('build' + buildOptions.buildVersion + '.zip'))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while creating zip-archive.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(buildOptions.buildPath))
                .pipe(
                    notifier('Zip-archive\'s been created')
                );
        } else {
            gutil.log('!Archiver is not used!');
            cb(null);
        }
    });
};