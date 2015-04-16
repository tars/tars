var gutil = require('gulp-util');

module.exports = function (event, path) {
    gutil.log('File: ' + gutil.colors.green.bold(path) + ' Event: ' + gutil.colors.green.bold(event));
};