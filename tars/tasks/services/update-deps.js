'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;

/**
 * Update dependencies
 */
module.exports = function () {
    return gulp.task('service:update-deps', function (cb) {
        const Download = tars.require('download');
        const exec = require('child_process').exec;
        const fs = require('fs');
        const downloadPackage = new Download({ extract: true })
            .get('https://raw.githubusercontent.com/tars/tars/master/package.json')
            .dest('./');

        function downloadNewPackageJson() {
            fs.rename('./package.json', './_package.json', function () {
                downloadPackage.run(function (err) {
                    if (err) {
                        throw err;
                    }
                    exec('npm i', function (error, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                        console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
                        gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Deps update has been finished successfully!'));
                        console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
                        cb(error);
                    });
                });
            });
        }

        fs.exists('./_package.json', function (exists) {
            if (exists) {
                fs.unlink('./_package.json', function () {
                    downloadNewPackageJson();
                });
            } else {
                downloadNewPackageJson();
            }
        });

    });
};
