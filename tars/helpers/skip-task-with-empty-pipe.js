'use strict';

const through2 = tars.packages.through2;

/**
 * Skip task if there are no any files in pipe
 * @param  {String}   taskName        The name of task to skip
 * @param  {Callback} skipCallback    Callback for task skipping
 * @return {Object}                   Pipe
 */
module.exports = function skipTaskWithEmptyPipe(taskName, skipCallback) {
    let filesCount = 0;

    return through2.obj(function (file, enc, callback) {

        if (!file.isNull()) {
            filesCount++;
        }

        this.push(file); // eslint-disable-line no-invalid-this

        return callback();
    }, (continueCallback) => {

        if (filesCount) {
            return continueCallback();
        } else {
            tars.skipTaskLog(taskName, 'No files were passed');
            return skipCallback();
        }
    });
};
