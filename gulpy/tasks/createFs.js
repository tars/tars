var gulp = require('gulp'),                                     // Gulp JS
    run = require('gulp-run'),                                  // Run bash-scripts from gulp
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    os = require('os'),                                         // Node os module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    ms = false;                                                 // Windows System Detect

var paths = 'markup/' + projectConfig.fs.staticFolderName + '/js/libs ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/js/plugins ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + ' ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/content ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/plugins ' +
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite ';

    for (var i = 0; i < projectConfig.useImageWithDpi.length; i++) {
        paths += 'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/sprite/' + projectConfig.useImageWithDpi[i] + 'dpi ';
    }

    paths += 'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/svg ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/fonts ' + 
            'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.cssPreprocessor + '/plugins ' + 
            'markup/modules/_template/assets ' + 
            'markup/modules/_template/ie';

    windowsPaths = paths.replace(/\//g,"\\\\");


// Create FS.
module.exports = function() {
    
    return gulp.task('create-fs', function(cb) {
        if (os.platform() == 'win32') {
            ms = true;
        }

        gulp.src('')
            .pipe(gulpif(ms, 
                run('move ./markup/static ./markup/' + projectConfig.fs.staticFolderName + '\n mkdir ' + windowsPaths),
                run('mv ./markup/static ./markup/' + projectConfig.fs.staticFolderName + '\n mkdir ' + paths)
                )
            )
            .pipe(
                gulpif(notifyConfig.useNotify, 
                    notify({
                        onLast: true,
                        sound: notifyConfig.sounds.onSuccess,
                        title: notifyConfig.title,
                        message: 'Builder\'ve been inited. \n'+ notifyConfig.taskFinishedText +'<%= options.date %>',
                        templateOptions: {
                            date: modifyDate.getTimeOfModify()
                        }
                    })
                )
            );

        gutil.log('Don\'t forget to check project config in root directory (projectConfig.js)');

        cb(null);
    });   
};   