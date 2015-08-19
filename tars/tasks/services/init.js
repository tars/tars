'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var ncp = tars.packages.ncp.ncp;
var Download = tars.packages.download;
var os = require('os');
var tarsConfig = tars.config;

var templaterName = tars.templater.name;
var githubConfig = {
    user: 'tars',
    repoPrefix: 'tars-'
};
var templaterVersion = (process.env.tarsVersion ? 'version-' + process.env.tarsVersion : 'version-' + require('../../../package.json').version);
var cssVersion = templaterVersion;
var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName + '/archive/' + templaterVersion + '.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + tarsConfig.cssPreprocessor + '/archive/' + cssVersion + '.zip';

ncp.limit = 16;

require('./create-fs')();

/**
 * Init builder, download css-preprocessor and templater
 */
module.exports = function () {
    return gulp.task('service:init', ['service:create-fs'], function (cb) {

        var downloadTemplater,
            downloadCssPreprocessor,
            downloadTemplaterTest,
            downloadCssPreprocessorTest;

        downloadTemplaterTest = new Download({ mode: '755' })
            .get(templaterUrl);

        downloadCssPreprocessorTest = new Download({ mode: '755' })
            .get(cssPreprocessorUrl);

        if (os.platform() === 'darwin') {
            console.log('\n\n' + gutil.colors.bold('🅃 🄰 🅁 🅂\n'));
        } else {
            console.log('\n\n' + gutil.colors.bold('T A R S\n'));
        }
        console.log(gutil.colors.magenta.bold('Hi, I\'m TARS. I will help you to make awesome markup!\n\n'));
        console.log('You could find more info about me at https://github.com/tars/tars/blob/master/README.md');

        if (process.env.tarsVersion) {
            console.log('Execute ' + gutil.colors.cyan('"tars --help"') + ' to see all avalible options and commands.\n');
            console.log('Start your work with "tars dev".\n\n');
        } else {
            console.log('\nStart your work with "gulp dev".\n\n');
        }

        downloadTemplaterTest.run(function (err, files) {
            if (err) {
                templaterVersion = 'master';
                templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName + '/archive/' + templaterVersion + '.zip';
            }

            downloadTemplater = new Download({ extract: true, mode: '755' })
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

        downloadCssPreprocessorTest.run(function (err, files) {
            if (err) {
                cssVersion = 'master';
                cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + tarsConfig.cssPreprocessor + '/archive/' + cssVersion + '.zip';
            }

            downloadCssPreprocessor = new Download({ extract: true, mode: '755' })
                .get(cssPreprocessorUrl)
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

                ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-' + cssVersion + '/tars/tasks', './tars/tasks/css', function (err) {
                    if (err) {
                        gutil.log(gutil.colors.red('x'), ' Error while copy tars css preproc task');
                        gutil.log('Please, repost with message to developer.');
                        return;
                    }
                });

                ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-' + cssVersion + '/markup/static', './markup/' + tarsConfig.fs.staticFolderName, function (err) {
                    if (err) {
                        gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                        gutil.log('Please, repost with message to developer.');
                        return;
                    }
                });

                ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-' + cssVersion + '/markup/modules/_template', './markup/modules/_template/', function (err) {
                    if (err) {
                        gutil.log(gutil.colors.red('x'), ' Error while copy modules for css preproc');
                        gutil.log('Please, repost with message to developer.');
                        return;
                    }

                    console.log(gutil.colors.black.bold('\n---------------------------------------------------'));
                    console.log(gutil.colors.green.bold('TARS have been inited successfully!\n'));
                    console.log('You choose:');
                    console.log(gutil.colors.magenta.bold(tarsConfig.cssPreprocessor), ' as css-preprocessor');
                    console.log(gutil.colors.magenta.bold(templaterName), ' as templater\n');
                    console.log(gutil.colors.black.bold('---------------------------------------------------\n'));
                });
            });
        });
    });
};
