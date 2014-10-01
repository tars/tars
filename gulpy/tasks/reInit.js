var gulp = require('gulp'),                                     // Gulp JS
    projectConfig = require('../../projectConfig'),             // Project config
    gutil = require('gulp-util');                               // Gulp util module

require('./removeInitFs')();
require('./init')();

// Re-init builder
module.exports = function() {
    
    return gulp.task('re-init', ['remove-init-fs'], function() {
        gutil.log(gutil.colors.red('!NOTE, YOU CAN\'T CHANGE staticFolderName AND imagesFolderName NOW!'));
        gulp.start('init');
    });
};