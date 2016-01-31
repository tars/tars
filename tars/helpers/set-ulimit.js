'use strict';

/**
 * Set ulimit to tars.config.ulimit
 * @return {Boolean}
 */
module.exports = function setUlimit() {
    const limit = tars.config.ulimit;
    let posix;

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
