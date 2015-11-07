'use strict';

var through2 = tars.packages.through2;
var gutil = tars.packages.gutil;

/**
 * Skip task if there are no any files in pipe
 * @return {cb}
 */
module.exports = function skipTaskWithEmptyPipe(taskName, skipCallback) {
    var filesCount = 0;

    return through2.obj(function (file, enc, callback) {

        if (!file.isNull()) {
            filesCount++;
        }

        this.push(file);

        return callback();
    }, function (continueCallback) {

        if (filesCount) {
            return continueCallback();
        } else {
            tars.skipTaskLog(taskName, 'No files were passed');
            return skipCallback();
        }
    });
};
