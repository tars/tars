'use strict';

var gulp = tars.packages.gulp;
var del = tars.packages.del;
var staticFolderName = tars.config.fs.staticFolderName;
tars.packages.promisePolyfill.polyfill();

var pathsToDel = [
             'markup/' + staticFolderName + '/js/framework',
             'markup/' + staticFolderName + '/js/libraries',
             'markup/' + staticFolderName + '/js/plugins',
             'markup/' + staticFolderName + '/' + tars.config.fs.imagesFolderName + '/',
             'markup/' + staticFolderName + '/fonts/',
             'markup/' + staticFolderName + '/scss/',
             'markup/' + staticFolderName + '/stylus/',
             'markup/' + staticFolderName + '/less/',
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
 */
module.exports = function () {
    return gulp.task('service:remove-init-fs', function (cb) {
        del(pathsToDel).then(function () { cb(); });
    });
};
