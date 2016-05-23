'use strict';

/**
 * Styles compilation
 */
module.exports = () => {
    return tars.packages.gulp.task('css:compile-css', () => {
        return require(`${tars.root}/tasks/css/helpers/${tars.config.css.workflow}-compile-css-task-template`)();
    });
};
