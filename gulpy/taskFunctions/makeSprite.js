var gulp = require('gulp'),                                     // Gulp JS
    spritesmith = require('gulp.spritesmith'),                  // Sprite generator
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    browserSync = require('browser-sync');                      // Plugin for sync with browser

// Make sprite and scss for this sprite
module.exports = function(cb) {

    var spriteData = gulp.src('./markup/static/images/sprite/*.png')

    .pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprite.scss',
        padding: 4,
        engineOpts: {
            imagemagick: true
        }
    }))
    .on('error', notify.onError(function (error) {
        return notifyConfig.errorMessage(error);
    }));

    spriteData.img.pipe(gulp.dest('./dev/static/img/'))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Sprite img is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );
        
    spriteData.css.pipe(gulp.dest('./markup/static/scss/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Scss for sprite is ready. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );

    cb(null);
};   