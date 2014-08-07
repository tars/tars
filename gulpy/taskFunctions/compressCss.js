var gulp = require('gulp'),                                     // Gulp JS
    csso = require('gulp-csso'),                                // Css minify
    rename = require('gulp-rename'),                            // File rename
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator');    

// Compress css-files
module.exports = function(cb) {

    gulp.src('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/css/*.css')
        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/css/'))
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

    cb(null);    
};   