'use strict';

/**
 * Output in the begining
 */
module.exports = function (gutil) {

    if (!tars.cli) {
        var i = 0;

        if (!tars.flags.release) {
            console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
            console.log(gutil.colors.red.bold('You\'ve started TARS via gulp.'));
            console.log(gutil.colors.red.bold('This mode is depricated for developing.'));
            console.log(gutil.colors.red.bold('Please, use only "gulp --release" in with mode.\n'));
            console.log('Install tars-cli for developing.');
            console.log('Run the command ' + gutil.colors.cyan('"npm i -g tars-cli"') + ', to install tars-cli.');
            console.log('More info: https://github.com/tars/tars-cli.');
            console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
        }

        console.log('\n----------------------------------------------------------------------');
        console.log(gutil.colors.green.bold('Build have been started. You are using:\n'));

        if (tars.flags.release) {
            console.log(gutil.colors.black.bold('• release mode;'));
        }

        if (tars.flags.min) {
            console.log(gutil.colors.black.bold('• minify mode;'));
        }

        if (tars.flags.lr) {
            console.log(gutil.colors.black.bold('• livereload mode;'));
        }

        if (tars.flags.tunnel) {
            console.log(gutil.colors.black.bold('• tunnel mode;'));
        }

        if (tars.flags.ie8) {
            console.log(gutil.colors.black.bold('• ie8 maintenance;'));
        }

        for (var key in tars.flags) { i++; }

        if (i <= 1) {
            console.log(gutil.colors.black.bold('No modes.'));
        }

        console.log(gutil.colors.green.bold('\nHave a nice work.'));
        console.log(gutil.colors.green.bold('Let\'s go & create something awesome!\n'));
        console.log(gutil.colors.green.bold('Please wait for a moment, while I\'m preparing builder for working...'));

        console.log('----------------------------------------------------------------------\n');
    }
};
