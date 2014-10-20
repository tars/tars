var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    projectConfig = require('../../projectConfig'),
    notifyConfig = projectConfig.notifyConfig,
    modifyDate = require('../helpers/modifyDateFormatter'),
    templaterName = require('../helpers/templaterNameSetter'),
    gutil = require('gulp-util'),
    ncp = require('ncp').ncp,
    Download = require('download');

var githubConfig = {
    user: 'artem-malko',
    repo: 'markupBuilder-extensions',
    ref: 'master'
};

var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repo + '/archive/mkExt-' + templaterName() + '-templater.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repo + '/archive/mkExt-' + projectConfig.cssPreprocessor + '-preproc.zip';

ncp.limit = 16;
require('./create-fs')();


// Task description
module.exports = function() {

    return gulp.task('init', ['create-fs'], function() {

        var downloadTemplater = new Download({ extract: true})
            .get(templaterUrl)
            .dest('./.tmpTemplater')
            .use();

        var downloadCssPreprocessor = new Download({ extract: true})
            .get(cssPreprocessorUrl)
            .dest('./.tmpPreproc')
            .use();    

        // Including templater
        downloadTemplater.run(function (err, files, stream) {

            if (err) {
                throw err;
            }

            ncp('./.tmpTemplater/markupBuilder-extensions-mkExt-' + templaterName() + '-templater/markup', './markup', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red(err));
                    gutil.log(gutil.colors.red('x'),
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'),
            });

            ncp('./.tmpTemplater/markupBuilder-extensions-mkExt-' + templaterName() + '-templater/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'),
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'),
            });

            gutil.log(gutil.colors.green('✔'),
        });

        

        // Including css-preprocessor
        downloadCssPreprocessor.run(function (err, files, stream) {

            if (err) {
                throw err;
            }

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'),
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'),
            });

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'),
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'),
            });

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'),
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'),
            });

            gutil.log(gutil.colors.green('✔'),
        });

    });
};