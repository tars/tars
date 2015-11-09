'use strict';

/**
 * Set ulimit to tars.config.ulimit
 * @return {Boolean}
 */
module.exports = function () {
    var limit = tars.config.ulimit;
    var posix;

    try {
        posix = require('posix');
    } catch (ex) {
        return false;
    }

    if (posix) {
        try {
            posix.setrlimit('nofile', { soft: limit });
            return true;
        } catch (ex) {
            console.log('Error while ulimit setting');
            return false;
        }
    }
    return false;
};
