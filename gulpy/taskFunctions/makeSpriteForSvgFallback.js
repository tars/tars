var gulp = require('gulp'),                                     // Gulp JS
    spritesmith = require('gulp.spritesmith'),                  // Sprite generator
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    gutil = require('gulp-util'),                               // Gulp util module
    projectConfig = require('../../projectConfig')              // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync'),                      // Plugin for sync with browser
    dpi = projectConfig.useDpi;                                 // Array of used dpi

// Make sprite and scss for this sprite
module.exports = function() {

    if (projectConfig.useSVG) {

        var spriteData = '';

        spriteData = gulp.src('./dev/static/img/rasterSvgImages/*.png')

            .pipe(
                spritesmith(
                    {
                        imgName: 'svg-fallback-sprite.png',
                        cssName: 'svg-fallback-sprite.scss',
                        Algorithms: 'diagonal',
                        // padding: 4,
                        engineOpts: {
                            imagemagick: true
                        },
                        cssTemplate: './markup/static/scss/spriteGeneratorTemplates/scss.svgFallbackSprite.mustache'
                    }
                )
            )
            .on('error', notify.onError(
                function (error) {
                    return notifyConfig.errorMessage(error);
                    }
                )
            );
        

        spriteData.img.pipe(gulp.dest('./dev/static/img/rasterSvgSprite/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Sprite img for svg is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        
        
        return spriteData.css.pipe(gulp.dest('./markup/static/scss/spritesScss/'))
                .pipe(browserSync.reload({stream:true}))
                .pipe(
                    gulpif(notifyConfig.useNotify, 
                        notify({
                            onLast: true,
                            sound: notifyConfig.sounds.onSuccess,
                            title: notifyConfig.title,
                            message: 'Scss for svg-sprite is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                            templateOptions: {
                                date: modifyDate.getTimeOfModify()
                            }
                        })
                    )
                ); 
    } else {
        gutil.log('!SVG is not used!');
    }           
};   