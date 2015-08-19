'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var mkdirp = tars.packages.mkdirp;
var fs = require('fs');
var tarsConfig = tars.config;

var paths = [
        'markup/' + tarsConfig.fs.staticFolderName + '/js/framework',
        'markup/' + tarsConfig.fs.staticFolderName + '/js/libraries',
        'markup/' + tarsConfig.fs.staticFolderName + '/js/plugins',
        'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName,
        'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/content',
        'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/general',
        'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/plugins',
        'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/sprite'
    ];
var i = 0;

for (; i < tarsConfig.useImagesForDisplayWithDpi.length; i++) {
    paths.push('markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/sprite/' + tarsConfig.useImagesForDisplayWithDpi[i] + 'dpi');
}

paths.push(
    'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/svg',
    'markup/' + tarsConfig.fs.staticFolderName + '/fonts',
    'markup/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.cssPreprocessor,
    'markup/modules/_template/assets',
    'markup/modules/_template/ie'
);

/**
 * Create fs for project
 */
module.exports = function () {
    return gulp.task('service:create-fs', function (cb) {

        if (tarsConfig.fs.staticFolderName != 'static') {
            fs.renameSync('./markup/static/', './markup/' + tarsConfig.fs.staticFolderName);
        }

        paths.forEach(function (path) {
            mkdirp(path, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });

        cb(null);
    });
};
