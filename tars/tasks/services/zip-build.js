'use strict';

var gulp = tars.packages.gulp;
var gutil = tars.packages.gutil;
var zip = tars.packages.zip;
var plumber = tars.packages.plumber;
var notifier = tars.helpers.notifier;

/**
 * Create zip archive of build
 */
module.exports = function () {
    return gulp.task('service:zip-build', function (cb) {
        if (tars.config.useArchiver) {
            return gulp.src(tars.options.build.path + '**', { base: '.' })
                .pipe(plumber({
                    errorHandler: function (error) {
                        notifier.error('An error occurred while creating zip-archive.', error);
                    }
                }))
                .pipe(zip('build' + tars.options.build.version + '.zip'))
                .pipe(gulp.dest(tars.options.build.path))
                .pipe(
                    notifier.success('Zip-archive\'s been created')
                );
        } else {
            gutil.log('!Archiver is not used!');
            cb(null);
        }
    });
};
