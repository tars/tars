'use strict';

const gulp = tars.packages.gulp;

/**
 * Styles compilation
 */
module.exports = function () {
    return gulp.task('css:compile-css', function () {
        return require('./helpers/compile-css-task-template')();
    });
};
