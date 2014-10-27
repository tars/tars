var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter');

// Minify HTML
module.exports = function(buildOptions) {
    var opts = {
        conditionals: true,
        quotes: true
    };
    
    return gulp.task('minify-html', function(cb) {
        if (projectConfig.minifyHtml) {

            return gulp.src('./dev/*.html')
                .pipe(minifyHTML(opts))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifing html-files.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest('./dev/'))
                .pipe(
                    gulpif(notifyConfig.useNotify, 
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'Html \'ve been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                );
        } else {
            gutil.log('!HTML-minify disabled!');
            cb(null);
        }        

    });
};   