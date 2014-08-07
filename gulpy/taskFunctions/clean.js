var gulp = require('gulp'),                                     // Gulp JS
    rimraf = require('gulp-rimraf'),                            // Clean module
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,           // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify
    buildVersionGenerator = require('../helpers/buildVersionGenerator'),
    clearCaches = require('../helpers/clearCaches');       // Clear caches for gulp-cache plugin
    

cache.caches = {};

// Clean dev directory and cache
module.exports = function() {

    clearCaches(cache);

    return gulp.src('./dev/', {read: false})
        .on('error', notify.onError(function (error) {
            return notifyConfig.errorMessage(error);
        }))
        .pipe(rimraf())
        .pipe(
            gulpif(notifyConfig.useNotify, 
                notify({
                    onLast: true,
                    sound: notifyConfig.sounds.onSuccess,
                    title: notifyConfig.title,
                    message: 'Clear task complited \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                    templateOptions: {
                        date: modifyDate.getTimeOfModify()
                    }
                })
            )
        );
};   