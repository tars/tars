'use strict';

/**
 * Generate build version
 * @return {String} build version
 */
module.exports = function setBuildVersion() {
    var buildVerion = '_ver-' + (new Date()).toUTCString();

    // build version is current date without spaces (replaced to _) and without time zone info.
    return buildVerion.replace(/[,]?\s[,]?/g, '_').replace(/:/g, '-').replace(/_[\w]*$/, '');
};
