'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var ncp = tars.packages.ncp.ncp;
var Download = tars.packages.download;
var os = require('os');

var templaterName = tars.templater.name;
var githubConfig = {
    user: 'tars',
    repoPrefix: 'tars-'
};
var templaterVersion = (process.env.tarsVersion ? 'version-' + process.env.tarsVersion : 'version-' + require('../../../tars.json').version);
var cssVersion = templaterVersion;
var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName + '/archive/' + templaterVersion + '.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + tars.config.cssPreprocessor + '/archive/' + cssVersion + '.zip';

ncp.limit = 16;

require('./create-fs')();

function logError(message) {
    tars.say(gutil.colors.red('x') + ' ' + message);
    tars.say('Please, repost with message to developer tars.builder@gmail.com');
}

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


        if (tars.cli) {
            tars.say('It\'s almost ready!');
        } else {
            console.log('\n');
            tars.say('Hi!');
            tars.say('Let\'s create awesome markup!');
        }

        tars.say('You can find more info about TARS at ' + gutil.colors.cyan('"https://github.com/tars/tars/blob/master/README.md"'));

        if (tars.cli) {
            tars.say('Run the command ' + gutil.colors.cyan('"tars --help"') + ' to see all avalible options and commands.');
            tars.say('Start your work with ' + gutil.colors.cyan('"tars dev"') + '.');
        } else {
            console.log('\n');
            tars.say(gutil.colors.red.bold('You\'ve started TARS via gulp.'));
            tars.say(gutil.colors.red.bold('This mode is depricated for developing.'));
            tars.say(gutil.colors.red.bold('Please, do not use "dev" tasks in with mode.\n'));
            tars.say('Install tars-cli for developing.');
            tars.say('Run the command ' + gutil.colors.cyan('"npm i -g tars-cli"') + ', to install tars-cli.');
            tars.say('More info: https://github.com/tars/tars-cli.');
            console.log('\n\n');
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
                        logError('Error while copy markup templater');
                        return;
                    }
                });

                ncp('./.tmpTemplater/tars-' + templaterName + '-' + templaterVersion + '/tars/tasks', './tars/tasks/html', function (err) {
                    if (err) {
                        logError('Error while copy tars templater task');
                        return;
                    }
                });
            });
        });

        downloadCssPreprocessorTest.run(function (err, files) {
            if (err) {
                cssVersion = 'master';
                cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + tars.config.cssPreprocessor + '/archive/' + cssVersion + '.zip';
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

                ncp('./.tmpPreproc/tars-' + tars.config.cssPreprocessor + '-' + cssVersion + '/tars/tasks', './tars/tasks/css', function (err) {
                    if (err) {
                        logError('Error while copy tars css preproc task');
                        return;
                    }
                });

                ncp('./.tmpPreproc/tars-' + tars.config.cssPreprocessor + '-' + cssVersion + '/markup/static', './markup/' + tars.config.fs.staticFolderName, function (err) {
                    if (err) {
                        logError('Error while copy static for css preproc :(');
                        return;
                    }
                });

                ncp('./.tmpPreproc/tars-' + tars.config.cssPreprocessor + '-' + cssVersion + '/markup/modules/_template', './markup/modules/_template/', function (err) {
                    if (err) {
                        logError('Error while copy modules for css preproc');
                        return;
                    }

                    console.log(gutil.colors.black.bold('\n--------------------------------------------------------'));
                    tars.say(gutil.colors.green.bold('TARS has been inited successfully!\n'));
                    tars.say('You choosed:');
                    tars.say(gutil.colors.cyan.bold(tars.config.cssPreprocessor) + ' as css-preprocessor');
                    tars.say(gutil.colors.cyan.bold(templaterName) + ' as templater\n');
                    console.log(gutil.colors.black.bold('--------------------------------------------------------\n'));
                });
            });
        });
    });
};
