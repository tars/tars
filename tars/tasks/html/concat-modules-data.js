var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var notifier = require('../../helpers/notifier');
var tarsConfig = require('../../../tars-config');

/**
 * conact data for modules to one file
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('html:concat-modules-data', function(cb) {
        return gulp.src('./markup/modules/**/data/data.js')
            .pipe(concat('modulesData.js', {newLine: ',\n\n'}))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while concating module\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/temp/'))
            .pipe(
                notifier('Data for modules ready')
            );
    });
};