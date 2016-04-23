'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const fs = require('fs');

/**
 * Update dependencies
 */
module.exports = () => {
    return gulp.task('service:update-deps', done => {
        const Download = tars.require('download');
        const exec = require('child_process').exec;
        const downloadPackage = new Download({ extract: true })
            .get('https://raw.githubusercontent.com/tars/tars/master/package.json')
            .dest('./');

        tars.say(
            gutil.colors.yellow('This command is depricated and won\'t be supported in the future!\n')
        );

        function downloadNewPackageJson() {
            fs.rename('./package.json', './_package.json', () => {
                downloadPackage.run(downloadError => {

                    if (downloadError) {
                        throw downloadError;
                    }

                    exec('npm i', (execError, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                        console.log(
                            gutil.colors.black.bold(
                                '\n------------------------------------------------------------'
                            )
                        );
                        gutil.log(
                            gutil.colors.green('✔'),
                            gutil.colors.green.bold('Deps update has been finished successfully!')
                        );
                        console.log(
                            gutil.colors.black.bold(
                                '------------------------------------------------------------\n'
                            )
                        );
                        done(execError);
                    });
                });
            });
        }

        fs.exists('./_package.json', exists => {
            if (exists) {
                fs.unlink('./_package.json', () => {
                    downloadNewPackageJson();
                });
            } else {
                downloadNewPackageJson();
            }
        });

    });
};
