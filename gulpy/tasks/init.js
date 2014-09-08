// This is example of task function

var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    ghdownload = require('github-download');
    ncp = require('ncp').ncp,
    templateExtension = '',
    projectConfigTemlater = projectConfig.templater.toLowerCase(),
    rmdir = require('../../node_modules/gulp-rimraf/node_modules/rimraf');

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

                console.log('End downloading');

                ncp('./.tmpTemplater/markup', './markup', function (err) {
                    if (err) {
                        console.log('error markup templater');
                    }
                    console.log('done markup');
                });

                ncp('./.tmpTemplater/gulpy', './gulpy', function (err) {
                    if (err) {
                        console.log('error gulpy templater');
                    }
                    console.log('done gulpy');
                });
        });

        // Including css-preprocessor
        ghdownload({user: githubConfig.user, repo: githubConfig.repo, ref: 'mkExt-' + projectConfig.cssPreprocessor + '-preproc'}, '.tmpPreproc')
        .on('end', function() {
            ncp('./.tmpPreproc/gulpy', './gulpy', function (err) {
                if (err) {
                    console.log('error gulpy css preproc');
                }
            });

            ncp('./.tmpPreproc/markup/static', './markup/' + projectConfig.fs.staticFolderName, function (err) {
                if (err) {
                    console.log('error static  css preproc');
                }
            });

            ncp('./.tmpPreproc/markup/modules/_template', './markup/modules/_template/', function (err) {
                if (err) {
                    console.log('error modules  css preproc');
                }
            });
        });

    });
};