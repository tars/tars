'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;
const staticFolderName = tars.config.fs.staticFolderName;
const staticFolderPath = `markup/${staticFolderName}`;
const componentsFolderPath = `./markup/${tars.config.fs.componentsFolderName}`;

const pathsToDel = [
    `${staticFolderPath}/js/framework`,
    `${staticFolderPath}/js/libraries`,
    `${staticFolderPath}/js/plugins`,
    `${staticFolderPath}/${tars.config.fs.imagesFolderName}/`,
    `${staticFolderPath}/fonts/`,
    `${staticFolderPath}/scss/`,
    `${staticFolderPath}/stylus/`,
    `${staticFolderPath}/less/`,
    `${componentsFolderPath}/_template/assets/`,
    `${componentsFolderPath}/_template/ie/`,
    `${componentsFolderPath}/head/`,
    `${componentsFolderPath}/footer/`,
    `${componentsFolderPath}/_template/_template.scss`,
    `${componentsFolderPath}/_template/_template.less`,
    `${componentsFolderPath}/_template/_template.styl`,
    `${componentsFolderPath}/_template/_template.html`,
    `${componentsFolderPath}/_template/_template.jade`,
    './markup/pages/',
    './.tmpTemplater/',
    './.tmpPreproc/'
];

/**
 * Remove inited file structure.
 */
module.exports = () => {
    return gulp.task('service:remove-init-fs', done => {
        del(pathsToDel).then(() => {
            done();
        });
    });
};
