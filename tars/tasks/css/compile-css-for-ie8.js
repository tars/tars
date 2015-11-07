'use strict';

var gulp = tars.packages.gulp;

var generateTaskContent = require('./helpers/compile-css-task-template');

/**
 * Styles compilation for IE8
 */
module.exports = function () {
    return gulp.task('css:compile-css-for-ie8', function (cb) {
        if (tars.flags.ie8 || tars.flags.ie) {
            return generateTaskContent('ie8');
        } else {
            tars.skipTaskLog('css:compile-css-for-ie8', 'Stylies for IE8 are not used');
            cb(null);
        }
    });
};
