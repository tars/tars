'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const del = tars.packages.del;

const githubConfig = {
    user: 'tars',
    repoPrefix: 'tars-'
};

require('./create-fs')();

/**
 * Make url to download TARS parts
 * @param  {String} type    Type of the generated link
 * @param  {String} version Used version of TARS
 * @return {String}         Url to download
 */
function makeUrl(type, version) {
    const urlTemplate = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix;

    if (type === 'templater') {
        return urlTemplate + tars.templater.name + '/archive/' + version + '.zip';
    } else {
        return urlTemplate + tars.cssPreproc.name + '/archive/' + version + '.zip';
    }
}

/**
 * Init builder, download css-preprocessor and templater
 */
module.exports = function () {
    return gulp.task('service:init', ['service:create-fs'], function () {

        const ncp = tars.require('ncp');
        const Download = tars.require('download');

        ncp.limit = 16;

        /**
         * Get used version of TARS parts
         * @param  {String} type Type of TARS part
         * @return {Object}        Promise
         */
        function getVersionToDownload(type) {
            return new Promise(function (resolve) {
                var version;

                if (process.env.tarsVersion) {
                    version = 'version-' + process.env.tarsVersion;
                } else {
                    version = 'version-' + require('../../../tars.json').version;
                }

                new Download({ mode: '755' })
                    .get(makeUrl(type, version))
                    .run(function (error) {
                        if (error) {
                            version = 'master';
                        }

                        resolve({
                            version: version,
                            type: type
                        });
                    });
            });
        }

        /**
         * Download parts
         * @param  {Object} params Version and type of the part
         * @return {Object}        Promise
         */
        function download(params) {
            return new Promise(function (resolve, reject) {
                var destPath;

                if (params.type === 'templater') {
                    destPath = './.tmpTemplater';
                } else {
                    destPath = './.tmpPreproc';
                }

                new Download({ extract: true, mode: '755' })
                    .get(makeUrl(params.type, params.version))
                    .dest(destPath)
                    .run(function (error) {
                        if (error) {
                            reject(error);
                        }
                        resolve(params);
                    });
            });
        }

        /**
         * Apply downloaded files
         * @param  {Object} params Version and type of the part
         * @return {Object}        Promise
         */
        function applyDownloadedParts(params) {
            return new Promise(function (resolve, reject) {
                var downloadedPartsPath;

                if (params.type === 'templater') {
                    downloadedPartsPath = './.tmpTemplater/tars-' + tars.templater.name;
                } else {
                    downloadedPartsPath = './.tmpPreproc/tars-' + tars.cssPreproc.name;
                }

                downloadedPartsPath += '-' + params.version + '/markup';

                ncp(downloadedPartsPath, './markup', function (error) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            });
        }

        /**
         * Generate start screen
         * @return {Object}        Promise
         */
        function generateStartScreen() {
            return new Promise(function (resolve) {
                if (tars.cli) {
                    tars.say('It\'s almost ready!');
                } else {
                    console.log('\n');
                    tars.say('Hi!');
                    tars.say('Let\'s create awesome markup!');
                }

                tars.say('You can find more info about TARS at ' +
                            gutil.colors.cyan('"https://github.com/tars/tars/blob/master/README.md"'));

                if (tars.cli) {
                    tars.say('Run the command ' + gutil.colors.cyan('"tars --help"') +
                                ' to see all avalible options and commands.');
                    tars.say('Start your work with ' + gutil.colors.cyan('"tars dev"') + '.');
                } else {
                    console.log('\n');
                    tars.say(gutil.colors.red.bold('You\'ve started TARS via gulp.'));
                    tars.say(gutil.colors.red.bold('This mode is depricated for developing.'));
                    tars.say(gutil.colors.red.bold('Please, do not use "dev" tasks in with mode.\n'));
                    tars.say('Install tars-cli for developing.');
                    tars.say('Run the command ' + gutil.colors.cyan('"npm i -g tars-cli"') +
                                ', to install tars-cli.');
                    tars.say('More info: https://github.com/tars/tars-cli.');
                    console.log('\n\n');
                }

                resolve();
            });
        }

        /**
         * Remove temp folders
         * @return {Object}        Promise
         */
        function removeTmpFolders() {
            return new Promise(function (resolve) {
                del(['./.tmpTemplater/', './.tmpPreproc/']).then(function () {
                    resolve();
                });
            });
        }

        /**
         * Generate last screen after success downloading
         */
        function finishInit() {
            console.log(gutil.colors.black.bold('\n--------------------------------------------------------'));
            tars.say(gutil.colors.green.bold('TARS has been inited successfully!\n'));
            tars.say('You choosed:');
            tars.say(gutil.colors.cyan.bold(tars.cssPreproc.name) + ' as css-preprocessor');
            tars.say(gutil.colors.cyan.bold(tars.templater.name) + ' as templater\n');
            console.log(gutil.colors.black.bold('--------------------------------------------------------\n'));
        }

        // Start init
        Promise
            .all([
                generateStartScreen(),
                getVersionToDownload('templater')
                    .then(download)
                    .then(applyDownloadedParts),
                getVersionToDownload('preprocessor')
                    .then(download)
                    .then(applyDownloadedParts)
            ])
            .then(removeTmpFolders)
            .then(finishInit)
            .catch(function (error) {
                tars.say(gutil.colors.red(error));
                tars.say('Please, repost with message and the stack trace to developer tars.builder@gmail.com');
                console.error(error.stack);
            });
    });
};
