'use strict';

var gulp = tars.packages.gulp;

var generateTaskContent = require('./helpers/compile-css-task-template');

/**
 * Styles compilation
 */
module.exports = function () {
    return gulp.task('css:compile-css', function () {
        return generateTaskContent();
    });
};
