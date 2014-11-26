var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');
var browserSync = require('browser-sync');
var os = require('os');

/**
 * Move images from assets modules of modules
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('move-assets', function(cb) {
        return gulp.src('./markup/modules/**/assets/**/*.*')
            .pipe(cache('move-assets'))
            .pipe(rename(function(path) {
                if (os.platform() === 'win32') {
                    path.dirname = path.dirname.match(/[a-zA-Z0-9]+\\/)[0];
                } else {
                    path.dirname = path.dirname.match(/[a-zA-Z0-9]+\//)[0];
                }
            }))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving assets.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/assets/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify,
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Assets\'ve been moved \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    });
};