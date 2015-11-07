'use strict';

var gulp = tars.packages.gulp;

var generateTaskContent = require('./helpers/compile-css-task-template');

/**
 * Styles compilation for IE9
 */
module.exports = function () {
    return gulp.task('css:compile-css-for-ie9', function (cb) {
        if (tars.flags.ie9 || tars.flags.ie) {
            return generateTaskContent('ie9');
        } else {
            tars.skipTaskLog('css:compile-css-for-ie9', 'Stylies for IE9 are not used');
            cb(null);
        }
    });
};
