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
        './markup/static/scss/reset.scss',
        './markup/static/scss/mixins.scss',
        './markup/static/scss/spritesScss/sprite96.scss'
    ];

    if (projectConfig.useSVG) {
        scssFilesToConcatinate.push(
            './markup/static/scss/spritesScss/svg-fallback-sprite.scss',
            './markup/static/scss/spritesScss/svg-sprite.scss'
        );
    }

    scssFilesToConcatinate.push(
        './markup/static/scss/fonts.scss',
        './markup/static/scss/vars.scss',
        './markup/static/scss/GUI.scss',
        './markup/static/scss/common.scss',
        './markup/static/scss/plugins/*.scss',
        './markup/static/scss/plugins/**/*.scss',
        './markup/modules/**/*.scss',
        './markup/modules/**/ie/ie9.scss'
    );

// Scss compilation for ie9
module.exports = function() {

    return gulp.src(scssFilesToConcatinate)
        .pipe(concat('main_ie9.css'))
        .pipe(sass())
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(autoprefix('ie 9', { cascade: true })) 
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./dev/static/css/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Scss-files for ie9 have been compiled. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );
};   