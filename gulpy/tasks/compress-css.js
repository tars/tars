var gulp = require('gulp'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Compress css-files
module.exports = function(buildOptions) {

    return gulp.task('compress-css', function() {
        return gulp.src('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/*.css')
            .pipe(csso())
            .pipe(rename({
                suffix: ".min"
            }))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildOptions.buildVersion + '/' + projectConfig.fs.staticFolderName + '/css/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Css\'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};   