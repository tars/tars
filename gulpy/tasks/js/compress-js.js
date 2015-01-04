var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-сonfig');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

/**
 * Compress js-files
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    require('./strip-debug')(buildOptions);

    return gulp.task('compress-js', ['strip-debug'], function() {
        return gulp.src(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/main' + buildOptions.hash + '.js')
            .pipe(uglify('main' + buildOptions.hash + '.min.js', {
                mangle: false
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while compressing js.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest(buildOptions.buildPath + tarsConfig.fs.staticFolderName + '/js/'))
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