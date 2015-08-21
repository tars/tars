'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var mkdirp = tars.packages.mkdirp;
var fs = require('fs');
var staticFolderName = tars.config.fs.staticFolderName;
var imagesFolderName = tars.config.fs.imagesFolderName;

var paths = [
        'markup/' + staticFolderName + '/js/framework',
        'markup/' + staticFolderName + '/js/libraries',
        'markup/' + staticFolderName + '/js/plugins',
        'markup/' + staticFolderName + '/' + imagesFolderName,
        'markup/' + staticFolderName + '/' + imagesFolderName + '/content',
        'markup/' + staticFolderName + '/' + imagesFolderName + '/general',
        'markup/' + staticFolderName + '/' + imagesFolderName + '/plugins',
        'markup/' + staticFolderName + '/' + imagesFolderName + '/sprite'
    ];
var i = 0;

for (; i < tars.config.useImagesForDisplayWithDpi.length; i++) {
    paths.push('markup/' + staticFolderName + '/' + imagesFolderName + '/sprite/' + tars.config.useImagesForDisplayWithDpi[i] + 'dpi');
}

paths.push(
    'markup/' + staticFolderName + '/' + imagesFolderName + '/svg',
    'markup/' + staticFolderName + '/fonts',
    'markup/' + staticFolderName + '/' + tars.config.cssPreprocessor,
    'markup/modules/_template/assets',
    'markup/modules/_template/ie'
);

/**
 * Create fs for project
 */
module.exports = function () {
    return gulp.task('service:create-fs', function (cb) {

        if (staticFolderName != 'static') {
            fs.renameSync('./markup/static/', './markup/' + staticFolderName);
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
