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

// Re-init builder
module.exports = function() {
    
    return gulp.task('re-init', ['remove-init-fs'], function() {
        gutil.log(gutil.colors.red('!NOTE, YOU CAN\'T CHANGE staticFolderName AND imagesFolderName NOW!'));
        gulp.start('init');
    });
};