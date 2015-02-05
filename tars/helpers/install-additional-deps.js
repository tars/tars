var os = require('os');
var exec = require('child_process').exec;
var usersDeps;

if (os.platform() !== 'win32') {
    exec('npm i posix', function (error, stdout, stderr) {
        if (error) {
            console.log(stderr);
        } else {
            console.log(stdout);
        }
    });
}

try {
    usersDeps = require('../../user-package');
} catch(er) {
    console.log('User-package.json is not valid!\n');
    console.log(er);
}

for (dep in usersDeps.dependencies) {
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