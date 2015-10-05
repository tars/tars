'use strict';

/**
 * Output in the begining
 */
module.exports = function (gutil) {
    var currentCommand = process.argv.slice(2)[0];

    // Do not show if command was init, re-init or update-deps
    if (!currentCommand || currentCommand === 'init' || currentCommand === 're-init' || currentCommand === 'update-deps') {
        return;
    }

    if (!tars.cli) {
        var i = 0;

        if (!tars.flags.release && !tars.flags.min) {
            console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
            tars.say(gutil.colors.red.bold('You\'ve started TARS via gulp.'));
            tars.say(gutil.colors.red.bold('This mode is depricated for developing.'));
            tars.say(gutil.colors.red.bold('Please, do not use "dev" tasks in with mode.\n'));
            tars.say('Install tars-cli for developing.');
            tars.say('Run the command ' + gutil.colors.cyan('"npm i -g tars-cli"') + ', to install tars-cli.');
            tars.say('More info: https://github.com/tars/tars-cli.');
            console.log(gutil.colors.yellow.inverse('\n----------------------------------------------------------------------'));
        }

        console.log('\n----------------------------------------------------------------------------');
        tars.say(gutil.colors.white.bold('Build have been started. You are using:\n'));

        if (tars.flags.release) {
            tars.say(gutil.colors.cyan.bold('• release mode;'));
        }

        if (tars.flags.min) {
            tars.say(gutil.colors.cyan.bold('• minify mode;'));
        }

        if (tars.flags.lr) {
            tars.say(gutil.colors.cyan.bold('• livereload mode;'));
        }

        if (tars.flags.tunnel) {
            tars.say(gutil.colors.cyan.bold('• tunnel mode;'));
        }

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.say(gutil.colors.cyan.bold('• ie8 maintenance;'));
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.say(gutil.colors.cyan.bold('• ie9 maintenance;'));
        }

        for (var key in tars.flags) { i++; }

        if (i <= 1) {
            tars.say(gutil.colors.black.bold('No modes.'));
        }

        console.log('\n');
        tars.say(gutil.colors.white.bold('Have a nice work!'));
        tars.say(gutil.colors.white.bold('Please wait for a moment, while I\'m preparing builder for working...'));

        console.log('----------------------------------------------------------------------------\n');
    }
};
