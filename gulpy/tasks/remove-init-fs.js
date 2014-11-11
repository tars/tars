var gulp = require('gulp'),
    del = require('del'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),

    pathToDel = [
                 'markup/' + projectConfig.fs.staticFolderName + '/js/libs',
                 'markup/' + projectConfig.fs.staticFolderName + '/js/plugins',
                 'markup/' + projectConfig.fs.staticFolderName + '/' + projectConfig.fs.imagesFolderName + '/',
                 'markup/' + projectConfig.fs.staticFolderName + '/fonts/',
                 'markup/' + projectConfig.fs.staticFolderName + '/scss/',
                 'markup/' + projectConfig.fs.staticFolderName + '/stylus/',
                 'markup/' + projectConfig.fs.staticFolderName + '/less/',
                 'markup/modules/_template/assets/',
                 'markup/modules/_template/ie/',
                 './markup/modules/head/',
                 './markup/modules/footer/',
                 './markup/modules/_template/_template.scss',
                 './markup/modules/_template/_template.less',
                 './markup/modules/_template/_template.styl',
                 './markup/modules/_template/_template.html',
                 './markup/modules/_template/_template.jade',
                 './markup/pages/',
                 './.tmpTemplater/',
                 './.tmpPreproc/'
                ];

// Remove inited file structure.
module.exports = function() {
    return gulp.task('remove-init-fs', function(cb) {
        del(pathToDel, cb);
    });
};