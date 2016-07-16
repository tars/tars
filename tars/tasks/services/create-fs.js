'use strict';

const gulp = tars.packages.gulp;
const del = tars.packages.del;
const fs = require('fs');

const staticFolderName = tars.config.fs.staticFolderName;
const staticFolderPath = `markup/${staticFolderName}`;
const componentsFolderName = tars.config.fs.componentsFolderName;
const componentsFolderPath = `markup/${componentsFolderName}`;
const imagesFolderPath = `${staticFolderPath}/${tars.config.fs.imagesFolderName}`;

let paths = [
    `${staticFolderPath}/js/framework`,
    `${staticFolderPath}/js/libraries`,
    `${staticFolderPath}/js/plugins`,
    imagesFolderPath,
    `${imagesFolderPath}/content`,
    `${imagesFolderPath}/general`,
    `${imagesFolderPath}/plugins`,
    `${imagesFolderPath}/sprite`
];

tars.config.useImagesForDisplayWithDpi.forEach(dpiValue => {
    paths.push(`${imagesFolderPath}/sprite/${dpiValue}dpi`);
});

paths.push(
    `${imagesFolderPath}/svg`,
    `${staticFolderPath}/fonts`,
    `${staticFolderPath}/${tars.config.cssPreprocessor}`,
    `${componentsFolderPath}/_template/assets`,
    `${componentsFolderPath}/_template/ie`
);

/**
 * Create fs for project
 */
module.exports = () => {
    return gulp.task('service:create-fs', done => {
        const mkdirp = tars.require('mkdirp');

        if (staticFolderName !== 'static') {
            fs.renameSync('./markup/static/', `./markup/${staticFolderName}`);
        }

        if (componentsFolderName !== 'components') {
            del.sync('./markup/components/');
        }

        paths.forEach(path => {
            mkdirp(path, error => {
                if (error) {
                    console.error(error);
                }
            });
        });

        done(null);
    });
};
