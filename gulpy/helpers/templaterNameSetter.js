var tarsConfig = require('../../tars-config');
var tarsConfigTemlater = tarsConfig.templater.toLowerCase();
var templaterName = '';

/**
 * Set templates extension
 * @return {string} Templater name
 */
module.exports = function() {
    if (tarsConfigTemlater === 'jade') {
        templaterName = 'jade';
    } else if (tarsConfigTemlater === 'handlebars'
            || tarsConfigTemlater === 'handelbars'
            || tarsConfigTemlater === 'hdb'
            || tarsConfigTemlater === 'hb') {
        templaterName = 'handlebars';
    } else {
        templaterName = 'jade';
    }

    return templaterName;
}