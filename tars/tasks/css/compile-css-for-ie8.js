'use strict';

/**
 * Styles compilation for IE8
 */
module.exports = () => {
    return tars.packages.gulp.task('css:compile-css-for-ie8', done => {
        if (tars.flags.ie8 || tars.flags.ie) {
            return require(`${tars.root}/tasks/css/helpers/${tars.config.css.workflow}-compile-css-task-template`)('ie8');
        }

        tars.skipTaskLog('css:compile-css-for-ie8', 'Stylies for IE8 are not used');
        done(null);
    });
};
