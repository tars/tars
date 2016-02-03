'use strict';

/**
 * Generate build version
 * @return {String} build version
 */
module.exports = function setBuildVersion() {
    // build version is current date without spaces (replaced to _) and without time zone info.
    return '_ver-' + (new Date())
        .toUTCString()
        .replace(/[,]?\s[,]?/g, '_')
        .replace(/:/g, '-')
        .replace(/_[\w]*$/, '');
};
