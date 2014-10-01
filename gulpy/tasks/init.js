var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    templateExtension = require('../helpers/templateExtensionSetter'),
    gutil = require('gulp-util');                               // Gulp util module
    ncp = require('ncp').ncp;

var Download = require('download');
var progress = require('download-status');

var githubConfig = {
    user: 'artem-malko',
    repo: 'markupBuilder-extensions',
    ref: 'master'
};

var templaterUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repo + '/archive/mkExt-' + templateExtension() + '-templater.zip';
var cssPreprocessorUrl = 'https://github.com/' + githubConfig.user + '/' + githubConfig.repo + '/archive/mkExt-' + projectConfig.cssPreprocessor + '-preproc.zip';

ncp.limit = 16;
require('./createFs')();


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

            ncp('./.tmpTemplater/markupBuilder-extensions-mkExt-' + templateExtension() + '-templater/markup', './markup', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red(err));
                    gutil.log(gutil.colors.red('x'), ' Error while copy markup templater');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'), ' Done copy markup templater');
            });

            ncp('./.tmpTemplater/markupBuilder-extensions-mkExt-' + templateExtension() + '-templater/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy templater task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }
                gutil.log(gutil.colors.green('✔'), ' Done copy gulpy templater task');
            });

            gutil.log(gutil.colors.green('✔'), ' End downloading templater', gutil.colors.cyan(templateExtension()));
        });

        

        // Including css-preprocessor
        downloadCssPreprocessor.run(function (err, files, stream) {

            if (err) {
                throw err;
            }

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/gulpy', './gulpy', function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy gulpy css preproc task');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'), ' Done copy gulpy css-preproc task');
            });

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    gutil.log(gutil.colors.red('x'), ' Error while copy static for css preproc :(');
                    gutil.log('Please, repost with message to developer.');
                    return;
                }

                gutil.log(gutil.colors.green('✔'), ' Done copy static css-files');
            });

            ncp('./.tmpPreproc/markupBuilder-extensions-mkExt-' + projectConfig.cssPreprocessor + '-preproc/markup/modules/_template', './markup/modules/_template/', function (err) {
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