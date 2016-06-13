'use strict';

// It is a global var
require('../tars');

const exec = require('child_process').exec;
let usersDeps;

try {
    usersDeps = require(process.cwd() + '/user-package');
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        console.error('User-package.json is not valid!\n');
        console.error(error.stack);
    } else {
        console.log('User-package.json is not exist. Additional deps won\'t be installed.');
        console.log('It is not an Error, it is just warning!');
    }
}

/* eslint-disable no-loop-func */

if (usersDeps && usersDeps.dependencies) {
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
}

/* eslint-enable no-loop-func */
