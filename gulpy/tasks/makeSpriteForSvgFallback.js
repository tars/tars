var gulp = require('gulp'),                                     // Gulp JS
    spritesmith = require('gulp.spritesmith'),                  // Sprite generator
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    gutil = require('gulp-util'),                               // Gulp util module
    projectConfig = require('../../projectConfig')              // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Make sprite and scss for this sprite
// Return pipe with scss for sprite
module.exports = function() {

    return gulp.task('make-sprite-for-svg-fallback', function() {

        if (projectConfig.useSVG) {
            var spriteData = '';

            spriteData = gulp.src('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/rasterSvgImages/*.png')

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
                            cssTemplate: './markup/' + projectConfig.fs.staticFolderName + '/scss/spriteGeneratorTemplates/scss.svgFallbackSprite.mustache'
                        }
                    )
                )
                .on('error', notify.onError(
                    function (error) {
                        return 'Something is wrong.\nLook in console.\n' + error;
                        }
                    )
                );
            

            spriteData.img.pipe(gulp.dest('./dev/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/rasterSvgSprite/'))
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
            
            
            return spriteData.css.pipe(gulp.dest('./markup/' + projectConfig.fs.staticFolderName + '/scss/spritesScss/'))
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
    });           
};   