// This is example of task function

var gulp = require('gulp'),                                     // Gulp JS
    gulpif = require('gulp-if'),                                // Gulp if module
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    ghdownload = require('github-download');
    ncp = require('ncp').ncp;

require('./createFs')();

// Task description
module.exports = function() {
    
    return gulp.task('init', ['create-fs'], function() {
        // ghdownload({user: 'artem-malko', repo: 'test-github', ref: 'master'}, process.cwd() + '/temp')
        // .on('end', function() {
        //     ncp(process.cwd() + '/temp', process.cwd(), function (err) {

        //             if (err) {
        //                 console.log('error');
        //             }
        //         });
        // });
    });
};   