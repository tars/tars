var os = require('os');
var exec = require('child_process').exec;

if (os.platform() !== 'win32') {
    exec('npm i posix', function (error, stdout, stderr) {
        if (error) {
            console.log(stderr);
        } else {
            console.log(stdout);
        }
    });
}