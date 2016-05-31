'use strict';

const gulp = tars.packages.gulp;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;

/**
 * Create zip archive of build
 */
module.exports = () => {
    return gulp.task('service:zip-build', done => {

        if (tars.config.useArchiver) {
            const zip = tars.require('gulp-zip');
            const name = tars.packageInfo.name === 'awesome_project' ? 'build' : tars.packageInfo.name.replace(/[\s?+<>:*|"\\]/g, '_');
            const version = tars.options.build.version;

            return gulp.src(`${tars.options.build.path}**`, { base: tars.options.build.path })
                .pipe(plumber({
                    errorHandler(error) {
                        notifier.error('An error occurred while creating zip-archive.', error);
                    }
                }))
                .pipe(zip(`${name}${version}.zip`))
                .pipe(gulp.dest(tars.options.build.path))
                .pipe(
                    notifier.success('Zip-archive\'s been created')
                );
        }

        tars.skipTaskLog('service:zip-build', 'Archiver is not used');
        done(null);
    });
};
