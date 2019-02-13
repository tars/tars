'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;
const preProcName = tars.cssPreproc.name;
const preprocExtension = tars.cssPreproc.mainExt;
const spritesCssPath = `./markup/${tars.config.fs.staticFolderName}/${preProcName}/sprites-${preProcName}`;

let pathsToDel = [
    `${tars.config.devPath}`,
    `${spritesCssPath}/sprite_96.${preprocExtension}`,
    `${spritesCssPath}/svg-fallback-sprite.${preprocExtension}`,
    `${spritesCssPath}/svg-sprite.${preprocExtension}`,
    './.tmpTemplater/',
    './.tmpPreproc/'
];

/**
 * Clean dev directory and cache
 */
module.exports = () => {
    return gulp.task('service:clean', done => {
        if (!tars.config.useBuildVersioning && !tars.options.watch.isActive) {
            pathsToDel.push(tars.options.build.path);
        }

        del(pathsToDel, {force: true}).then(() => {
            done();
        });
    });
};
