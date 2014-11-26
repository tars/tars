var gulp = require('gulp');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');
var browserSync = require('browser-sync');

/**
 * Move fonts-files to dev directory
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('move-fonts', function() {
        return gulp.src('./markup/' + projectConfig.fs.staticFolderName + '/fonts/**/*.*')
            .pipe(cache('move-fonts'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving fonts.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/fonts'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Fonts\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};