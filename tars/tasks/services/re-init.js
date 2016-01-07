'use strict';

const gulp = tars.packages.gulp;

require('./remove-init-fs')();
require('./init')();

/**
 * Re-init builder
 */
module.exports = () => {
    return gulp.task('service:re-init', ['service:remove-init-fs'], () => {
        gulp.start('service:init');
    });
};
