var os = require('os');
var exec = require('child_process').exec;
var templaterName = require('./templater-name-setter')();
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

// Install special deps for selected templater or css-preprocessor

if (templaterName === 'handlebars') {
    exec('npm i digits@0.1.4', function (error, stdout, stderr) {
        if (error) {
            console.log(stderr);
        } else {
            console.log(stdout);
        }
    });
}

//"digits": "0.2.0",