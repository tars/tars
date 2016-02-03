'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;
const staticFolderName = tars.config.fs.staticFolderName;
const staticFolderPath = 'markup/' + staticFolderName;
const modulesFolderPath = './markup/modules';

const pathsToDel = [
    staticFolderPath + '/js/framework',
    staticFolderPath + '/js/libraries',
    staticFolderPath + '/js/plugins',
    staticFolderPath + '/' + tars.config.fs.imagesFolderName + '/',
    staticFolderPath + '/fonts/',
    staticFolderPath + '/scss/',
    staticFolderPath + '/stylus/',
    staticFolderPath + '/less/',
    modulesFolderPath + '/_template/assets/',
    modulesFolderPath + '/_template/ie/',
    modulesFolderPath + '/head/',
    modulesFolderPath + '/footer/',
    modulesFolderPath + '/_template/_template.scss',
    modulesFolderPath + '/_template/_template.less',
    modulesFolderPath + '/_template/_template.styl',
    modulesFolderPath + '/_template/_template.html',
    modulesFolderPath + '/_template/_template.jade',
    './markup/pages/',
    './.tmpTemplater/',
    './.tmpPreproc/'
];

/**
 * Remove inited file structure.
 */
module.exports = () => {
    return gulp.task('service:remove-init-fs', cb => {
        del(pathsToDel).then(() => {
            cb();
        });
    });
};
