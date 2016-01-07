'use strict';

/**
 * Styles compilation
 */
module.exports = () => {
    return tars.packages.gulp.task('css:compile-css', () => {
        return require('./helpers/compile-css-task-template')();
    });
};
