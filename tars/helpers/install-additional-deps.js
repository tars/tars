'use strict';

// It is a global var
require('../tars');

var os = require('os');
var exec = require('child_process').exec;
var templaterName = tars.templaterName;
var usersDeps;

try {
    usersDeps = require('../../user-package');
} catch (er) {
    console.log('User-package.json is not valid!\n');
    console.log(er);
}

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
