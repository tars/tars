var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var path = require('path');
var notify = require('gulp-notify');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');

/**
 * Move svg to dev directory (optional task)
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('move-svg', function(cb) {

        if (projectConfig.useSVG) {
            return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg/*.svg')
                .pipe(cache('move-svg'))
                .pipe(rename(function(path) {
                    path.dirname = '';
                }))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while moving svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg'))
                .pipe(
                    gulpif(notifyConfig.useNotify,
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'Svg\'ve been moved to dev\n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};