// This is example of task function

var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    ghdownload = require('github-download'),
    ncp = require('ncp').ncp,
    templateExtension = '',
    projectConfigTemlater = projectConfig.templater.toLowerCase();

ncp.limit = 16;
require('./createFs')();

var githubConfig = {
    user: 'artem-malko',
    repo: 'markupBuilder-extensions',
    ref: 'master'
};

if (projectConfigTemlater === 'jade') {
    templateExtension = 'jade';
} else if (projectConfigTemlater === 'handlebars' 
        || projectConfigTemlater === 'handelbars' 
        || projectConfigTemlater === 'hdb' 
        || projectConfigTemlater === 'hb') {
    templateExtension = 'handlebars';
} else {
    templateExtension = 'jade';
}

// Task description
module.exports = function() {
    
    return gulp.task('init', ['create-fs'], function() {

        // Including templater
        ghdownload({user: githubConfig.user, repo: githubConfig.repo, ref: 'mkExt-' + templateExtension + '-templater'}, '.tmpTemplater')
            .on('error', function(err) {
                    console.error(err);
            })
            .on('end', function() {

                ncp('./.tmpTemplater/markup', './markup', function (err) {
                    if (err) {
                        console.log('Error while copy markup templater');
                        return;
                    }
                    console.log('Done copy markup templater');
                });

                ncp('./.tmpTemplater/gulpy', './gulpy', function (err) {
                    if (err) {
                        console.log('Error while copy gulpy templater task');
                        return;
                    }
                    console.log('Done copy gulpy templater task');
                });

                console.log('End downloading templater');
        });

        // Including css-preprocessor
        ghdownload({user: githubConfig.user, repo: githubConfig.repo, ref: 'mkExt-' + projectConfig.cssPreprocessor + '-preproc'}, '.tmpPreproc')
        .on('end', function() {
            ncp('./.tmpPreproc/gulpy', './gulpy', function (err) {
                if (err) {
                    console.log('Error while copy gulpy css preproc task');
                    console.log('Please, repost to developer with message.');
                    return;
                }

                console.log('Done copy gulpy css-preproc task');
            });

            ncp('./.tmpPreproc/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    console.log('Error while copy static for css preproc :(');
                    console.log('Please, repost to developer with message.');
                    return;
                }

                console.log('Done copy static css-files');
            });

            ncp('./.tmpPreproc/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    console.log('Error while copy modules for css preproc');
                    console.log('Please, repost to developer with message.');
                    return;
                }

                console.log('Done copy css-files for moduels');
            });

            console.log('End downloading css-preproc');
        });

    });
};