'use strict';

/**
 * Set templates extension
 * @return {string} Templater name
 */
module.exports = function getTemplaterName(templaterNameFromConfig) {
    switch (templaterNameFromConfig) {
        case 'handelbars':
        case 'handlebars':
        case 'hdb':
        case 'hb':
            return 'handlebars';
        case 'jade':
        default:
            return 'jade';
    }
};
