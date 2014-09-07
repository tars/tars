var gulp = require('gulp'),                                     // Gulp JS
    concat = require('gulp-concat'),                            // Files concat
    sass = require('gulp-sass'),                                // Sass compilation
    gulpif = require('gulp-if'),                                // Gulp if module
    autoprefix = require('gulp-autoprefixer'),                  // Autoprefixer for css
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync'),                      // Plugin for sync with browser

    scssFilesToConcatinate = [
        './markup/' + projectConfig.fs.staticFolderName + '/scss/reset.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/mixins.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/spritesScss/sprite96.scss'
    ];

    if (projectConfig.useSVG) {
        scssFilesToConcatinate.push(
            './markup/' + projectConfig.fs.staticFolderName + '/scss/spritesScss/svg-fallback-sprite.scss',
            './markup/' + projectConfig.fs.staticFolderName + '/scss/spritesScss/svg-sprite.scss'
        );
    }

    scssFilesToConcatinate.push(
        './markup/' + projectConfig.fs.staticFolderName + '/scss/fonts.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/vars.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/GUI.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/common.scss',
        './markup/' + projectConfig.fs.staticFolderName + '/scss/plugins/**/*.scss',
        './markup/modules/*/*.scss'
    );

// Scss compilation
module.exports = function() {

    return gulp.task('compile-css', function() {
        gulp.src(scssFilesToConcatinate)
            .pipe(concat('main.css'))
            .pipe(sass())
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(autoprefix('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', { cascade: true })) 
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/css/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Scss-files\'ve been compiled. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });        
};   