'use strict';

/**
 * Get correct templater name
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
            return 'jade';
        case 'pug':
        default:
            return 'pug';
    }
};
