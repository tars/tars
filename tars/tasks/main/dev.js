'use strict';

const gulp = tars.packages.gulp;
const notify = tars.packages.notify;
const browserSync = tars.packages.browserSync;
const path = require('path');

const env = process.env;
const cwd = process.cwd();

/**
 * Build dev-version with watchers and livereload.
 */
module.exports = () => {

    /**
     * Start watchers and show notify
     */
    function devTaskFinallyActions() {
        // require system and user's watchers
        tars.helpers.tarsFsHelper.getWatchers().forEach(file => require(file)());

        if (tars.config.notifyConfig.useNotify && env.NODE_ENV !== 'production' && !env.DISABLE_NOTIFIER) {
            notify({
                title: tars.config.notifyConfig.title,
                icon: path.resolve(tars.root + '/icons/tars.png')
            }).write('Build has been created!');
        } else {
            tars.say('Build has been created!');
        }
    }

    return gulp.task('main:dev', ['main:build-dev'], () => {
        tars.options.notify = true;

        if (tars.useLiveReload) {
            const useHMR = tars.config.js.workflow === 'modular' && tars.config.js.bundler === 'webpack' && tars.config.js.webpack.useHMR;
            let browserSyncConfig = tars.pluginsConfig.browserSync;

            /* eslint-disable no-undefined */
            browserSyncConfig = Object.assign(
                browserSyncConfig,
                {
                    middleware: browserSyncConfig.middleware || [],
                    port: env.BROWSERSYNC_PORT || browserSyncConfig.port,
                    logConnections: browserSyncConfig.logConnections || true,
                    logLevel: browserSyncConfig.logLevel || 'info',
                    reloadOnRestart: browserSyncConfig.reloadOnRestart || true,
                    tunnel: tars.flags.tunnel
                }
            );
            /* eslint-enable no-undefined */

            if (!useHMR) {
                browserSync.init(browserSyncConfig);
                devTaskFinallyActions();
            } else {
                const webpackConfig = require(`${cwd}/webpack.config`);
                const webpackInstance = tars.require('webpack')(webpackConfig);
                const webpackDevMiddlewareInstance = tars.require('webpack-dev-middleware')(
                    webpackInstance,
                    {
                        publicPath: `/${tars.config.fs.staticFolderName}/js/`,
                        stats: {
                            colors: true
                        }
                    }
                );
                const browserSyncMiddleware = [
                    webpackDevMiddlewareInstance,
                    tars.require('webpack-hot-middleware')(webpackInstance)
                ];

                browserSyncConfig.middleware = browserSyncConfig.middleware.concat(browserSyncMiddleware);
                tars.say('Wait for a moment, please. Webpack is preparing bundle for you...');

                webpackDevMiddlewareInstance.waitUntilValid(() => {
                    browserSync.init(browserSyncConfig);
                    devTaskFinallyActions();
                });
            }
        } else {
            // Do not start Browser-sync without livereload, just watchers and notifications
            devTaskFinallyActions();
        }
    });
};
