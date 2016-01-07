'use strict';

const fs = require('fs');

/**
 * Load task and watchers
 * @param  {String} dir directory with files
 * @return {Array}      Path to dirs
 */
module.exports = function getFilesFromDir(dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach((file) => {
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
