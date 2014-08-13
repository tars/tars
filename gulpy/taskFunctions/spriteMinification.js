var gulp = require('gulp'),                                     // Gulp JS
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator'),
    os = require('os'),                                         // Node os module
    notMs = true;                                              // Windows System Detect

// Minify sprite img
module.exports = function() {

    // if (os.platform() != 'win32') {
    //     notMs = true;
    // }

    return gulp.src('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/img/**/sprite.png')
        .pipe(gulpif(notMs, 
                imagemin(
                    {
                        progressive: true,
                        svgoPlugins: [{removeViewBox: false}],
                        use: [pngcrush()]
                    }
                )
            )
        )
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(gulp.dest('./builds/build' + buildVersionGenerator.newBuildVersion + '/static/img/'))
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Sprite\'s been minified \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );
};