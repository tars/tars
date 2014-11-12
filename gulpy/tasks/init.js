var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var projectConfig = require('../../projectConfig');
var notifyConfig = projectConfig.notifyConfig;
var modifyDate = require('../helpers/modifyDateFormatter');
var templaterName = require('../helpers/templaterNameSetter');
var gutil = require('gulp-util');
var ncp = require('ncp').ncp;
var Download = require('download');

var githubConfig = {
    user: 'artem-malko',
    repoPrefix: 'tars-'
};

var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + templaterName() + '/archive/master.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repoPrefix + projectConfig.cssPreprocessor '/archive/master.zip';

ncp.limit = 16;
require('./create-fs')();


/**
 * Init builder, download css-preprocessor and templater
 * @param  {Object} buildOptions
 */
module.exports = function(buildOptions) {

    return gulp.task('init', ['create-fs'], function() {

        var downloadTemplater = new Download({ extract: true})
            .get(templaterUrl)
            .dest('./.tmpTemplater')
            .use();

        var downloadCssPreprocessor = new Download({ extract: true})
            .get(cssPreprocessorUrl)
            .dest('./.tmpPreproc')
            .use();

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

            ncp('./.tmpTemplater/tars-' + templaterName() + '/markup', './markup', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red(err));
                    gutil.log(gutil.colors.red('x'), ' Error while copy markup templater');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'), ' Done copy gulpy templater task');
            });

            ncp('./.tmpTemplater/tars-' + templaterName() + '/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy templater task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'), ' Done copy gulpy templater task');
            });

            gutil.log(gutil.colors.green('✔'), ' End downloading templater', gutil.colors.cyan(templaterName()));
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

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy css preproc task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'), ' Done copy gulpy css-preproc task');
            });

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'), ' Done copy static css-files');
            });

            ncp('./.tmpPreproc/tars-' + projectConfig.cssPreprocessor + '/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy modules for css preproc');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'), ' Done copy css-files for modules');
            });

            gutil.log(gutil.colors.green('✔'), ' End downloading css-preproc', gutil.colors.cyan(projectConfig.cssPreprocessor));
        });
    });
};