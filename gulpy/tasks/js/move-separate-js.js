var gulp = require('gulp');
var gulpif = require('gulp-if');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var notifyConfig = require('../../../projectConfig').notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Copy separate Js-files to dev directory
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('move-separate-js', function(cb) {
        gulp.src('./markup/static/js/separateJs/**/*.js')
            .pipe(cache('separate-js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving separate js-files.\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/static/js/separateJs'))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Separate js files\'s been copied \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        cb(null);
    });
};