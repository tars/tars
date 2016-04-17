'use strict';

const through2 = tars.packages.through2;

/**
 * Filter files in pipe via it's path
 */
module.exports = function filterFilesByPath(patterns) {
    const patternsToCheck = [].concat(patterns);

    return through2.obj(function (file, enc, callback) {
        const filePath = file.path.replace(/\\/g, '/');
        let checkStatus = true;

        patternsToCheck.forEach(pattern => {
            if (pattern.test(filePath)) {
                checkStatus = false;
            }
        });

        if (checkStatus) {
            this.push(file); // eslint-disable-line no-invalid-this
        }

        return callback();
    }, callback => callback());
};
