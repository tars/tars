'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

/**
 * Copy files from dev to build directory. Create build directory with new build version
 */
module.exports = () => {
    return gulp.task('service:pre-build', () => {
        return gulp.src(['./dev/**/*.*', '!./dev/temp/**'], { base: './dev/' })
            .pipe(plumber({
                errorHandler: error => {
                    notifier.error('An error occurred while running pre-build task.', error);
                }
            }))
            .pipe(gulp.dest(tars.options.build.path))
            .pipe(
                notifier.success('Pre-build task is finished')
            );
    });
};
