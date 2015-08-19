'use strict';

var tarsConfigTemplater = tars.config.templater.toLowerCase();
var templaterName = '';

/**
 * Set templates extension
 * @return {string} Templater name
 */
module.exports = function () {
    if (tarsConfigTemplater === 'jade') {
        templaterName = 'jade';
    } else if (tarsConfigTemplater === 'handlebars' ||
        tarsConfigTemplater === 'handelbars' ||
        tarsConfigTemplater === 'hdb' ||
        tarsConfigTemplater === 'hb') {
        templaterName = 'handlebars';
    } else {
        templaterName = 'jade';
    }

    return templaterName;
};
