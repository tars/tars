'use strict';

// It is a global var
require('../tars');

const exec = require('child_process').exec;
var usersDeps;

try {
    usersDeps = require('../../user-package');
} catch (er) {
    console.log('User-package.json is not valid!\n');
    console.log(er);
}

/* eslint-disable no-loop-func */

for (var dep in usersDeps.dependencies) {
    if (dep) {
        exec('npm i ' + dep + '@' + usersDeps.dependencies[dep], function (error, stdout, stderr) {
            if (error) {
                console.log(stderr);
            } else {
                console.log(stdout);
            }
        });
    }
}

/* eslint-enable no-loop-func */
