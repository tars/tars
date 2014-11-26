var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

var pathToDel = [
                 'markup/' + projectConfig.fs.staticFolderName + '/js/libraries',
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

/**
 * Remove inited file structure.
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('remove-init-fs', function(cb) {
        del(pathToDel, cb);
    });
};