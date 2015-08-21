'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var zip = tars.packages.zip;
var notify = tars.packages.notify;
var notifier = tars.helpers.notifier;

/**
 * Create zip archive of build
 */
module.exports = function () {
    return gulp.task('service:zip-build', function (cb) {
        if (tars.config.useArchiver) {
            return gulp.src(tars.options.build.path + '**', { base: '.' })
                .pipe(zip('build' + tars.options.build.version + '.zip'))
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while creating zip-archive.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(tars.options.build.path))
                .pipe(
                    notifier('Zip-archive\'s been created')
                );
        } else {
            gutil.log('!Archiver is not used!');
            cb(null);
        }
    });
};
