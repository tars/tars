var os = require('os');
var exec = require('child_process').exec;
var config = require('./process-config.js');
var usersDeps;

if (os.platform() !== 'win32') {
    run('npm i posix');
}

try {
    usersDeps = require('../../user-package');
} catch (er) {
    console.log('User-package.json is not valid!\n');
    console.log(er);
}

for (var dep in usersDeps.dependencies) {
    if (dep) {
        run('npm i ' + dep + '@' + usersDeps.dependencies[dep]);
    }
}

// Install special deps for selected templater or css-preprocessor

switch (config.templater) {
    case 'handlebars':
        run('npm i gulp-compile-handlebars@0.4.4');
        run('npm i digits@0.1.4');
        //"digits": "0.2.0",
        break;
    case 'jade':
        run('npm i gulp-jade@1.0.0');
        break;
}

switch (config.processor) {
    case 'scss':
        run('npm i gulp-sass@1.3.3');
        break;
    case 'less':
        run('npm i gulp-less@3.0.1');
        break;
}


function run(cmd) {
    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(stderr);
        } else {
            console.log(stdout);
        }
    })
}
