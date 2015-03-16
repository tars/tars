var gulp = require('gulp');
var del = require('del');
var tarsConfig = require('../../../tars-config');

var pathToDel = [
                 'markup/' + tarsConfig.fs.staticFolderName + '/js/framework',
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

    return gulp.task('service:remove-init-fs', function(cb) {
        del(pathToDel, cb);
    });
};