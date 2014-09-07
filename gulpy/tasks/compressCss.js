var gulp = require('gulp'),                                     // Gulp JS
    csso = require('gulp-csso'),                                // Css minify
    rename = require('gulp-rename'),                            // File rename
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator');    

// Compress css-files
module.exports = function() {

    return gulp.task('compress-css', function() {
        return gulp.src('./builds/build' + buildVersionGenerator.newBuildVersion + '/' + projectConfig.fs.staticFolderName + '/css/*.css')
            .pipe(csso())
            .pipe(rename({
                suffix: ".min"
            }))
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/' + projectConfig.fs.staticFolderName + '/css/'))
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