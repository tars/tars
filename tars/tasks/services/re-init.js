'use strict';

var gulp = tars.packages.gulp;

require('./remove-init-fs')();
require('./init')();

/**
 * Re-init builder
 */
module.exports = function () {
    return gulp.task('service:re-init', ['service:remove-init-fs'], function () {
        gulp.start('service:init');
    });
};
