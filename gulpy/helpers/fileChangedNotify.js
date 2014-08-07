var gutil = require('gulp-util');               // Gulp util module

// Output name of modified file to console
module.exports = function(filename) {
    gutil.log('file: "',filename,'" was changed');
};