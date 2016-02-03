'use strict';

// It is a global var
require('../tars');

const exec = require('child_process').exec;
let usersDeps;

try {
    usersDeps = require(process.cwd() + '/user-package');
} catch (error) {
    console.error('User-package.json is not valid!\n');
    console.error(error);
}

/* eslint-disable no-loop-func */

for (let dep in usersDeps.dependencies) {
    if (dep) {
        exec('npm i ' + dep + '@' + usersDeps.dependencies[dep], (error, stdout, stderr) => {
            if (error) {
                console.log(stderr);
            } else {
                console.log(stdout);
            }
        });
    }
}

/* eslint-enable no-loop-func */
