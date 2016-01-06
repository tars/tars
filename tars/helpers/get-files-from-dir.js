'use strict';

const fs = require('fs');

/**
 * Load task and watchers
 * @param  {String} dir directory with files
 * @return {Array}      Path to dirs
 */
function getFilesFromDir(dir) {
    var results = [],
        list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesFromDir(file));
        } else {
            if (!file.match(/(example-task)/) && !file.match(/(example-watcher)/)
                    && !file.match(/^_/) && !file.match(/\/helpers\//)
                    && file.match(/(.js)+/)) {
                results.push(file);
            }
        }
    });

    return results;
};

module.exports = getFilesFromDir;
