'use strict';

const gulp = tars.packages.gulp;
const gutil = tars.packages.gutil;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;
const cwd = process.cwd();

module.exports = () => {

    return gulp.task('js:webpack-processing', done => {

        tars.require('webpack')(require(`${cwd}/webpack.config`), (error, stats) => {

            if (!error) {
                error = stats.toJson().errors[0];
            }

            if (error) {
                notifier.error('JavaScript has not been processed', error);
            } else {
                console.log(stats.toString({
                    colors: true
                }));

                notifier.success('JavaScript has been processed', { notStream: true });

                if (tars.useLiveReload) {
                    browserSync.reload();
                }
            }

            // Task never errs in watch mode, it waits and recompiles
            if (!tars.options.watch.isActive && error) {
                done(
                    new gutil.PluginError(
                        'webpack-processing',
                        new Error('An error occured during webpack build process')
                    )
                );
            } else {
                if (!done.called) {
                    done.called = true;
                    done();
                }
            }
        });

    });
};
