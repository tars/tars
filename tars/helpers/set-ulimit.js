var tarsConfig = require('../../tars-config');

/**
 * Set ulimit to tarsConfig.ulimit
 */
module.exports = function () {
    var limit = tarsConfig.ulimit;
    var posix;

    try {
        posix = require('posix');
    } catch (ex) {
    }

    if (posix) {
        try {
            posix.setrlimit('nofile', { soft: limit });
            return true;
        } catch (ex) {
        }
    }
    return false;
};