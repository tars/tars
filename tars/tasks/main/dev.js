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

            if (browserSyncConfig.startUrl) {
                browserSyncConfig.startPath = browserSyncConfig.startUrl;
                browserSyncConfig.startUrl = undefined; // eslint-disable-line no-undefined
            }

            if (browserSyncConfig.useNotifyInBrowser) {
                browserSyncConfig.notify = browserSyncConfig.useNotifyInBrowser;
                browserSyncConfig.useNotifyInBrowser = undefined; // eslint-disable-line no-undefined
            }

            if (!browserSyncConfig.server) {
                browserSyncConfig.server = {};
            }

            if (browserSyncConfig.baseDir) {
                browserSyncConfig.server.baseDir = browserSyncConfig.baseDir;
                browserSyncConfig.baseDir = undefined; // eslint-disable-line no-undefined
            }

            browserSyncConfig.port = env.BROWSERSYNC_PORT || browserSyncConfig.port;

            browserSync(browserSyncConfig);
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
