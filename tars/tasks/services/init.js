var gulp = require('gulp');
var gutil = require('gulp-util');
var ncp = require('ncp').ncp;
var Download = require('download');
var os = require('os');
var tarsConfig = require('../../../tars/helpers/process-config.js')();

var templaterVersion = 'version-' + require('../../../package.json').version;
var processorVersion = 'version-' + require('../../../package.json').version;

var templaterName = tarsConfig.templater;
var processorName = tarsConfig.processor;

var templaterRepo = tarsConfig.templaterRepo;
var processorRepo = tarsConfig.processorRepo;

var templaterUrl = templaterRepo ? templaterRepo + '/archive/' + templaterVersion + '.zip' : false;
var processorUrl = processorRepo ? processorRepo + '/archive/' + processorVersion + '.zip' : false;

ncp.limit = 16;
require('./create-fs')();


/**
 * Init builder, download css-preprocessor and templater
 * @param  {Object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('service:init', ['service:create-fs'], function(cb) {

        if (os.platform() === 'darwin') {
            console.log('\n\n' + gutil.colors.bold('🅃 🄰 🅁 🅂\n'));
        } else {
            console.log('\n\n' + gutil.colors.bold('T A R S\n'));
        }
        console.log(gutil.colors.magenta.bold('Hi, I\'m TARS. I will help you to make awesome markup!\n\n'));
        console.log('You could find more info about me at https://github.com/artem-malko/tars/blob/master/README.md\n');
        console.log('Start your work with \'gulp dev\'\n\n');

        if (templaterUrl) {
            new Download().get(templaterUrl).run(function (err, files) {
                var downloadTemplater;

                if (err) {
                    templaterVersion = 'master';
                    templaterUrl = templaterRepo + '/archive/' + templaterVersion + '.zip';
                }

                downloadTemplater = new Download({ extract: true})
                    .get(templaterUrl)
                    .dest('./.tmpTemplater');

                /**
                 * Including templater
                 * @param  {Object} err
                 * @param  {Array} files
                 * @param  {Stream} stream
                 */
                downloadTemplater.run(function (err, files) {

                    if (err) {
                        throw err;
                    }

                    ncp('./.tmpTemplater/tars-' + templaterName + '-' + templaterVersion + '/markup', './markup', function (err) {
                        if (err) {
                            gutil.log(gutil.colors.red(err));
                            gutil.log(gutil.colors.red('x'), ' Error while copy markup templater');
                            gutil.log('Please, repost with message to developer.');
                            return;
                        }
                    });

                    ncp('./.tmpTemplater/tars-' + templaterName + '-' + templaterVersion + '/tars/tasks', './tars/tasks/html', function (err) {
                        if (err) {
                            gutil.log(gutil.colors.red('x'), ' Error while copy tars templater task');
                            gutil.log('Please, repost with message to developer.');
                            return;
                        }
                    });
                });
            });
        }

        if (processorUrl) {
            new Download().get(processorUrl).run(function (err, files) {
                var downloadCssPreprocessor;

                if (err) {
                    processorVersion = 'master';
                    processorUrl = processorRepo + '/archive/' + processorVersion + '.zip';
                }

                downloadCssPreprocessor = new Download({ extract: true})
                    .get(processorUrl)
                    .dest('./.tmpPreproc');

                /**
                 * Including css-preprocessor
                 * @param  {Object} err
                 * @param  {Array} files
                 * @param  {Stream} stream
                 */
                downloadCssPreprocessor.run(function (err, files) {

                    if (err) {
                        throw err;
                    }

                    ncp('./.tmpPreproc/tars-' + processorName + '-' + processorVersion + '/tars/tasks', './tars/tasks/css', function (err) {
                        if (err) {
                            gutil.log(gutil.colors.red('x'), ' Error while copy tars css preproc task');
                            gutil.log('Please, repost with message to developer.');
                            return;
                        }
                    });

                    ncp('./.tmpPreproc/tars-' + processorName + '-' + processorVersion + '/markup/static', './markup/' + tarsConfig.fs.staticFolderName, function (err) {
                        if (err) {
                            gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                            gutil.log('Please, repost with message to developer.');
                            return;
                        }
                    });

                    ncp('./.tmpPreproc/tars-' + processorName + '-' + processorVersion + '/markup/modules/_template', './markup/modules/_template/', function (err) {
                        if (err) {
                            gutil.log(gutil.colors.red('x'), ' Error while copy modules for css preproc');
                            gutil.log('Please, repost with message to developer.');
                            return;
                        }

                        console.log(gutil.colors.black.bold('\n---------------------------------------------------'));
                        console.log(gutil.colors.green.bold('TARS have been inited successfully!\n'));
                        console.log('You choose:');
                        console.log(gutil.colors.magenta.bold(processorName), ' as css-preprocessor');
                        console.log(gutil.colors.magenta.bold(templaterName), ' as templater\n');
                        console.log(gutil.colors.black.bold('---------------------------------------------------\n'));
                    });
                });
            });
        }

    });
};