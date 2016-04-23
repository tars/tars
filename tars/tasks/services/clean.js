'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;
const preProcName = tars.cssPreproc.name;
const preprocExtension = tars.cssPreproc.mainExt;
const spritesCssPath = `./markup/${tars.config.fs.staticFolderName}/${preProcName}/sprites-${preProcName}`;

let pathsToDel = [
    './dev/',
    `${spritesCssPath}/sprite_96.${preprocExtension}`,
    `${spritesCssPath}/svg-fallback-sprite.${preprocExtension}`,
    `${spritesCssPath}/svg-sprite.${preprocExtension}`,
    './.tmpTemplater/',
    './.tmpPreproc/'
];

if (!tars.config.useBuildVersioning) {
    pathsToDel.push(tars.options.build.path);
}

/**
 * Clean dev directory and cache
 */
module.exports = () => {
    return gulp.task('service:clean', done => {
        del(pathsToDel).then(() => {
            done();
        });
    });
};
