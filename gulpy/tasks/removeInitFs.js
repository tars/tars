var gulp = require('gulp'),                                     // Gulp JS
    del = require('del'),                            // Clean module
    gulpif = require('gulp-if'),                                // Gulp if module
    gutil = require('gulp-util'),                               // Gulp util module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig, // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify

    pathToDel = [
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
                ];

// Remove inited file structure.
module.exports = function() {
    return gulp.task('remove-init-fs', function(cb) {
        del(pathToDel, cb);
    });
};   