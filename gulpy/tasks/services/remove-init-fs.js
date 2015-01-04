var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-сonfig');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');

var pathToDel = [
                 'markup/' + tarsConfig.fs.staticFolderName + '/js/libraries',
                 'markup/' + tarsConfig.fs.staticFolderName + '/js/plugins',
                 'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/',
                 'markup/' + tarsConfig.fs.staticFolderName + '/fonts/',
                 'markup/' + tarsConfig.fs.staticFolderName + '/scss/',
                 'markup/' + tarsConfig.fs.staticFolderName + '/stylus/',
                 'markup/' + tarsConfig.fs.staticFolderName + '/less/',
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