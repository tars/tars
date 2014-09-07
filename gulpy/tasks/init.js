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
    projectConfigTemlater = projectConfig.templater.toLowerCase();

require('./createFs')();

var githubConfig = {
    user: 'artem-malko',
    repo: 'markupBuilder-extensions',
    ref: 'master'
};

if (projectConfigTemlater === 'jade') {
    templateExtension = 'jade';
} else if (projectConfigTemlater === 'hadlebars' 
        || projectConfigTemlater === 'hadelbars' 
        || projectConfigTemlater === 'hdb' 
        || projectConfigTemlater === 'hb') {
    templateExtension = 'hadlebars';
} else {
    templateExtension = 'jade';
}

// Task description
module.exports = function() {
    
    return gulp.task('init', ['create-fs'], function() {

        // Including templater
        ghdownload({user: githubConfig.user, repo: githubConfig.repo, ref: 'mkExt-' + templateExtension + '-templater'}, process.cwd() + '/.tmp-templater')
        .on('end', function() {
            ncp(process.cwd() + '/.tmp-templater', process.cwd(), function (err) {

                    if (err) {
                        console.log('error');
                    }
                });
        });

        // return gulp.src('./.tmp', { read: false })
        //     .pipe(rimraf({ force: true }));
        // });
};   