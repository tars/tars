var gulp = require('gulp'),                                     // Gulp JS
    spritesmith = require('gulp.spritesmith'),                  // Sprite generator
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig')              // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync'),                      // Plugin for sync with browser
    dpi = projectConfig.useDpi;                                 // Array of used dpi

// Make sprite and scss for this sprite
module.exports = function(cb) {

    var spriteData = [],
        dpiLength = dpi.length,
        dpi144 = false,
        dpi192 = false,
        dpi288 = false;

    for (var i = 0; i < dpiLength; i++) {
        if (dpi[i] == 144) {
            dpi144 = true;
        } else if (dpi[i] == 192) {
            dpi192 = true;
        } else if (dpi[i] == 288) {
            dpi288 = true;
        }
    }
        

    for (var i = 0; i < dpiLength; i++) {

        spriteData.push(gulp.src('./markup/static/images/sprite/' + dpi[i] + 'dpi/*.png')

            .pipe(
                spritesmith(
                    {
                        imgName: 'sprite.png',
                        cssName: 'sprite' + dpi[i] + '.scss',
                        Algorithms: 'diagonal',
                        // padding: 4 * dpi[i],
                        engineOpts: {
                            imagemagick: true
                        },
                        cssOpts: {
                            dpi144: dpi144,
                            dpi192: dpi192,
                            dpi288: dpi288
                        },
                        cssTemplate: './markup/static/scss/spriteGeneratorTemplates/scss.sprite.mustache'
                    }
                )
            )
            .on('error', notify.onError(
                function (error) {
                    return notifyConfig.errorMessage(error);
                    }
                )
            )
        );

        spriteData[i].img.pipe(gulp.dest('./dev/static/img/pngSprite/' + dpi[i] + 'dpi/'))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Sprite img with dpi = ' + dpi[i] + ' is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
    }
    
    return spriteData[0].css.pipe(gulp.dest('./markup/static/scss/spritesScss/'))
            .pipe(browserSync.reload({stream:true}))
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Scss for sprites is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            ); 
};   