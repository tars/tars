var gulp = require('gulp'),                                             // Gulp JS
    del = require('del'),                                    // Clean module
    cache = require('gulp-cached'),                                     // Gulp cache
    gulpif = require('gulp-if'),                                        // Gulp if module
    notify = require('gulp-notify'),                                    // Plugin for notify
    notifyConfig = require('../../projectConfig').notifyConfig,         // Notify config
    modifyDate = require('../helpers/modifyDateFormatter'),             // Date formatter for notify
    clearCaches = require('../helpers/clearCaches');                    // Clear caches for gulp-cache plugin
    

cache.caches = {};

// Clean dev directory and cache
module.exports = function() {

    return gulp.task('clean', function(cb) {
        clearCaches(cache);

        del(['./dev/', './.tmpTemplater/', './.tmpPreproc/'], cb);
    });
};   