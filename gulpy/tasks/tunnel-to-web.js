var gulp = require('gulp'),
    gutil = require('gulp-util'),
    ngrok = require('ngrok'),
    projectConfig = require('../../projectConfig');
    

// Tunnel your markup to web
module.exports = function(buildOptions) {

    return gulp.task('tunnel-to-web', function(cb) {
        ngrok.connect(projectConfig.browserSyncConfig.port, function (err, url) {

            if (buildOptions.tunnelUrl !== null) {
                cb(null);
                return;
            }

            // If there was an error, log it and exit
            if (err !== null) {
                gutil.log(gutil.colors.red('✘  Tunneling failed, please try again. Aborting.\n') + gutil.colors.red(err));
                process.exit(0);
            }

            buildOptions.tunnelUrl = url;
            gutil.log(gutil.colors.cyan('🌐  Public access at'), gutil.colors.magenta(buildOptions.tunnelUrl));

            cb(null);
        });
    });
};   