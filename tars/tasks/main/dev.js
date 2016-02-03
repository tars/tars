'use strict';

const gulp = tars.packages.gulp;
const notify = tars.packages.notify;
const browserSync = tars.packages.browserSync;
const path = require('path');

const browserSyncConfig = tars.config.browserSyncConfig;
const env = process.env;

/**
 * Build dev-version with watchers and livereload.
 */
module.exports = () => {
    return gulp.task('main:dev', ['main:build-dev'], () => {
        tars.options.notify = true;

        if (tars.flags.lr || tars.flags.tunnel) {
            browserSync({
                server: {
                    baseDir: browserSyncConfig.baseDir
                },
                logConnections: true,
                debugInfo: true,
                injectChanges: browserSyncConfig.injectChanges || false,
                port: env.BROWSERSYNC_PORT || browserSyncConfig.port,
                open: browserSyncConfig.open,
                browser: browserSyncConfig.browser,
                startPath: browserSyncConfig.startUrl,
                notify: browserSyncConfig.useNotifyInBrowser,
                tunnel: tars.flags.tunnel,
                reloadOnRestart: true
            });
        }

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

    });
};
