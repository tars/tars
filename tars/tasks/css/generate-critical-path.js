'use strict';

var gulp = tars.packages.gulp;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;
var critical = require('critical');

/**
 * Generate critical css
 */
module.exports = function () {
    return gulp.task('css:generate-critical-path', function () {
        critical.generateInline({
            base: 'dev/',
            src: 'index.html',
            styleTarget: 'static/css/main.css',
            htmlTarget: 'index.html',
            width: 1300,
            height: 900,
            minify: true
        });
    });
};
