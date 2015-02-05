var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifyConfig = tarsConfig.notifyConfig;
var modifyDate = require('../../helpers/modify-date-formatter');
var templaterName = require('../../helpers/templater-name-setter');
var gutil = require('gulp-util');
var ncp = require('ncp').ncp;
var Download = require('download');
var os = require('os');

var githubConfig = {
    user: 'artem-malko',
    repoPrefix: 'tars-'
};

var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName() + '/archive/master.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + tarsConfig.cssPreprocessor + '/archive/master.zip';

ncp.limit = 16;
require('./create-fs')();


/**
 * Init builder, download css-preprocessor and templater
 * @param  {Object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('init', ['create-fs'], function(cb) {

        var downloadTemplater = new Download({ extract: true})
            .get(templaterUrl)
            .dest('./.tmpTemplater')
            .use();

        var downloadCssPreprocessor = new Download({ extract: true})
            .get(cssPreprocessorUrl)
            .dest('./.tmpPreproc')
            .use();

        if (os.platform() === 'darwin') {
            console.log('\n\n' + gutil.colors.bold('🅃 🄰 🅁 🅂\n'));
        } else {
            console.log('\n\n' + gutil.colors.bold('T A R S\n'));
        }
        console.log(gutil.colors.magenta.bold('Hi, I\'m TARS. I will help you to make awesome markup!\n\n'));
        console.log('You could find more info about me at https://github.com/artem-malko/tars/blob/master/README.md\n');
        console.log('Start your work with \'gulp dev\'\n\n');

        /**
         * Including templater
         * @param  {Object} err
         * @param  {Array} files
         * @param  {Stream} stream
         */
        downloadTemplater.run(function (err, files, stream) {

            if (err) {
                throw err;
            }

            ncp('./.tmpTemplater/tars-' + templaterName() + '-master/markup', './markup', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red(err));
                    gutil.log(gutil.colors.red('x'), ' Error while copy markup templater');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            ncp('./.tmpTemplater/tars-' + templaterName() + '-master/tars/tasks', './tars/tasks/html', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy tars templater task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });
        });

        /**
         * Including css-preprocessor
         * @param  {Object} err
         * @param  {Array} files
         * @param  {Stream} stream
         */
        downloadCssPreprocessor.run(function (err, files, stream) {

            if (err) {
                throw err;
            }

            ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-master/tars/tasks', './tars/tasks/css', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy tars css preproc task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-master/markup/static', './markup/' + tarsConfig.fs.staticFolderName, function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            ncp('./.tmpPreproc/tars-' + tarsConfig.cssPreprocessor + '-master/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy modules for css preproc');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                console.log(gutil.colors.black.bold('\n---------------------------------------------------'));
                console.log(gutil.colors.green.bold('TARS have been inited successfully!\n'));
                console.log('You choose:');
                console.log(gutil.colors.magenta.bold(tarsConfig.cssPreprocessor), ' as css-preprocessor');
                console.log(gutil.colors.magenta.bold(templaterName()), ' as templater\n');
                console.log(gutil.colors.black.bold('---------------------------------------------------\n'));
            });
        });
    });
};