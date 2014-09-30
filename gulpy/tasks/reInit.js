var gulp = require('gulp'),                                     // Gulp JS
    notify = require('gulp-notify'),                            // Plugin for notify
    projectConfig = require('../../projectConfig'),             // Project config
    notifyConfig = projectConfig.notifyConfig,                  // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),     // Date formatter for notify
    gutil = require('gulp-util');                               // Gulp util module
    templateExtension = '',
    projectConfigTemlater = projectConfig.templater.toLowerCase();

require('./removeInitFs')();
require('./init')();

// Task description
module.exports = function() {
    
    return gulp.task('re-init', ['remove-init-fs'], function() {
        gulp.start('init');
    });
};