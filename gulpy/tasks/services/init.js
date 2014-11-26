var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../../helpers/modifyDateFormatter');
var templaterName = require('../../helpers/templaterNameSetter');
var gutil = require('gulp-util');
var ncp = require('ncp').ncp;
var Download = require('download');
var os = require('os');

var githubConfig = {
    user: 'artem-malko',
    repoPrefix: 'tars-'
};

var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName() + '/archive/master.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + projectConfig.cssPreprocessor + '/archive/master.zip';

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

            ncp('./.tmpTemplater/tars-' + templaterName() + '-master/gulpy/tasks', './gulpy/tasks/html', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy templater task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            console.log(gutil.colors.green('✔'), ' End downloading templater');

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

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '-master/gulpy/tasks', './gulpy/tasks/css', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy css preproc task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '-master/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
            });

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '-master/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy modules for css preproc');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                console.log(gutil.colors.black.bold('\n---------------------------------------------------'));
                console.log(gutil.colors.green.bold('TARS have been inited successfully!\n'));
                console.log('You choose:');
                console.log(gutil.colors.magenta.bold(projectConfig.cssPreprocessor), ' as css-preprocessor');
                console.log(gutil.colors.magenta.bold(templaterName()), ' as templater\n');
                console.log(gutil.colors.black.bold('---------------------------------------------------\n'));
            });

            console.log(gutil.colors.green('✔'), ' End downloading css-preproc');

        });
    });
};