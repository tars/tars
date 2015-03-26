var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var Download = require('download');
var fs = require('fs');

/**
 * Update dependencies
 * @param  {object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('service:update-deps', function(cb) {
        var downloadPackage = new Download({ extract: true})
            .get('https://raw.githubusercontent.com/2gis/tars/master/package.json')
            .dest('./');

        function downloadNewPackageJson() {
            fs.rename('./package.json', './_package.json', function() {
                downloadPackage.run(function (err, files, stream) {
                    if (err) {
                        throw err;
                    }
                    exec('npm i', function (err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                        console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
                        gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Deps update has been finished successfully!'));
                        console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
                        cb(err);
                    });
                });
            });
        }

        fs.exists('./_package.json', function(exists) {
            if (exists) {
                fs.unlink('./_package.json', function() {
                    downloadNewPackageJson();
                });
            } else {
                downloadNewPackageJson();
            }
        });

    });
};