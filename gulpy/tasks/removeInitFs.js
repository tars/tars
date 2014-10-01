var gulp = require('gulp'),                                     // Gulp JS
    run = require('gulp-run'),                                  // Run bash-scripts from gulp
    rimraf = require('gulp-rimraf'),                            // Clean module
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter');     // Date formatter for notify

// Remove inited file structure.
module.exports = function() {

    return gulp.task('remove-init-fs', function() {
        return gulp.src(
                [
                 'markup/' + projectConfig.fs.staticFolderName + '/js/libs', 
                 'markup/' + projectConfig.fs.staticFolderName + '/js/plugins',
                 'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/',
                 'markup/' + projectConfig.fs.staticFolderName + '/fonts/',
                 'markup/' + projectConfig.fs.staticFolderName + '/scss/',
                 'markup/' + projectConfig.fs.staticFolderName + '/less/',
                 'markup/modules/_template/assets/',
                 'markup/modules/_template/ie/',
                 './markup/modules/head/',
                 './markup/modules/footer/',
                 './markup/modules/_template/_template.scss',
                 './markup/modules/_template/_template.less',
                 './markup/modules/_template/_template.html',
                 './markup/modules/_template/_template.jade', 
                 './markup/pages/', 
                 './markup/' + projectConfig.fs.staticFolderName + '/scss/',
                 './markup/' + projectConfig.fs.staticFolderName + '/less/', 
                 './.tmpTemplater/', 
                 './.tmpPreproc/'
                ], {read: false})
            .on('error', notify.onError(function (error) {
                return 'Something is wrong.\nLook in console.\n' + error;
            }))
            .pipe(rimraf())
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Reinit cleared folders \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );
        });
};   