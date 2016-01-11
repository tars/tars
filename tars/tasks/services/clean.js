'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;

var pathsToDel = [
    './dev/',
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
    return gulp.task('service:clean', cb => {
        del(pathsToDel).then(() => {
            cb();
        });
    });
};
