'use strict';

/**
 * Styles compilation for IE8
 */
module.exports = () => {
    return tars.packages.gulp.task('css:compile-css-for-ie8', (cb) => {
        if (tars.flags.ie8 || tars.flags.ie) {
            return require('./helpers/compile-css-task-template')('ie8');
        } else {
            tars.skipTaskLog('css:compile-css-for-ie8', 'Stylies for IE8 are not used');
            cb(null);
        }
    });
};
