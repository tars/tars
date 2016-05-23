'use strict';

/**
 * Styles compilation for IE9
 */
module.exports = () => {
    return tars.packages.gulp.task('css:compile-css-for-ie9', done => {
        if (tars.flags.ie9 || tars.flags.ie) {
            return require(`${tars.root}/tasks/css/helpers/${tars.config.css.workflow}-compile-css-task-template`)('ie9');
        }

        tars.skipTaskLog('css:compile-css-for-ie9', 'Stylies for IE9 are not used');
        done(null);
    });
};
