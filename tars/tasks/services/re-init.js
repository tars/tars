var gulp = require('gulp');

require('./remove-init-fs')();
require('./init')();

/**
 * Re-init builder
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('service:re-init', ['service:remove-init-fs'], function () {
        gulp.start('service:init');
    });
};