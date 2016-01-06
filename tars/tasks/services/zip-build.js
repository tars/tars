'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

/**
 * Create zip archive of build
 */
module.exports = function () {
    return gulp.task('service:zip-build', function (cb) {

        if (tars.config.useArchiver) {
            const zip = tars.require('gulp-zip');

            return gulp.src(tars.options.build.path + '**', { base: tars.options.build.path })
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
            tars.skipTaskLog('service:zip-build', 'Archiver is not used');
            cb(null);
        }
    });
};
