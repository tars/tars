var gulp = require('gulp'),
    projectConfig = require('../../projectConfig'),
    gutil = require('gulp-util');

require('./remove-init-fs')();
require('./init')();

// Re-init builder
module.exports = function() {
    
    return gulp.task('re-init', ['remove-init-fs'], function() {
        gulp.start('init');
    });
};