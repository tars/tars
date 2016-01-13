'use strict';

/**
 * Output in the begining
 * @param  {Object} gutil Utils for gulp
 */
module.exports = gutil => {
    const currentCommand = process.argv.slice(2)[0];
    const silentCommands = ['init', 're-init', 'update-deps'];
    const usedFlagsArray = Object.keys(tars.flags);

    // Do not show if command was init, re-init or update-deps
    if (silentCommands.indexOf(currentCommand) > -1) {
        return;
    }

    // Log warning, if it is not CLI-mode
    if (!tars.cli) {
        if (tars.isDevMode) {
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
        tars.say('Build have been started. You are using:\n');

        if (tars.flags.release) {
            tars.say('• release mode;');
        }

        if (tars.flags.min) {
            tars.say('• minify mode;');
        }

        if (tars.flags.lr) {
            tars.say('• livereload mode;');
        }

        if (tars.flags.tunnel) {
            tars.say('• tunnel mode;');
        }

        if (tars.flags.ie8 || tars.flags.ie) {
            tars.say('• ie8 maintenance;');
        }

        if (tars.flags.ie9 || tars.flags.ie) {
            tars.say('• ie9 maintenance;');
        }

        if (usedFlagsArray.length === 1) {
            tars.say(gutil.colors.black.bold('No modes.'));
        }

        console.log('\n');
        tars.say('Have a nice work!');
        tars.say('Please wait for a moment, while I\'m preparing builder for working...');

        console.log('----------------------------------------------------------------------------\n');
    }
};
