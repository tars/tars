'use strict';

const gulp = tars.packages.gulp;

const staticFolderName = tars.config.fs.staticFolderName;
const staticFolderPath = 'markup/' + staticFolderName;
const imagesFolderPath = staticFolderPath + '/' + tars.config.fs.imagesFolderName;

var paths = [
    staticFolderPath + '/js/framework',
    staticFolderPath + '/js/libraries',
    staticFolderPath + '/js/plugins',
    imagesFolderPath,
    imagesFolderPath + '/content',
    imagesFolderPath + '/general',
    imagesFolderPath + '/plugins',
    imagesFolderPath + '/sprite'
];

tars.config.useImagesForDisplayWithDpi.forEach(function (dpiValue) {
    paths.push(
        imagesFolderPath + '/sprite/' + dpiValue + 'dpi'
    );
});

paths.push(
    imagesFolderPath + '/svg',
    staticFolderPath + '/fonts',
    staticFolderPath + '/' + tars.config.cssPreprocessor,
    'markup/modules/_template/assets',
    'markup/modules/_template/ie'
);

/**
 * Create fs for project
 */
module.exports = function () {
    return gulp.task('service:create-fs', function (cb) {

        const mkdirp = tars.require('mkdirp');
        const fs = require('fs');

        if (staticFolderName !== 'static') {
            fs.renameSync('./markup/static/', './markup/' + staticFolderName);
        }

        paths.forEach(function (path) {
            mkdirp(path, function (error) {
                if (error) {
                    console.error(error);
                }
            });
        });

        cb(null);
    });
};
