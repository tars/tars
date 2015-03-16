var fs = require('fs');

// Helper to load files from dir recursively and synchronously
var loadJsFiles = function(dir) {
    var results = [],
        list = fs.readdirSync(dir);

    list.forEach(function(file) {
        var stat;

        file = dir + '/' + file;
        stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(loadJsFiles(file));
        } else {
            if (!file.match(/(example-task)/) && !file.match(/(example-watcher)/) && file.match(/(.js*)/)) {
                results.push(file);
            }
        }
    });

    return results
}

module.exports = loadJsFiles;