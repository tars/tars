'use strict';

/**
 * Generate build version
 * @return {String} build version
 */
module.exports = function setBuildVersion() {
    // build version is current date without spaces (replaced to _) and without time zone info.
    return '_ver-' + new Date()
        .toString()
        .replace(/\s\w+\+.*/, '')
        .replace(/\s|:/g, '_');
};
