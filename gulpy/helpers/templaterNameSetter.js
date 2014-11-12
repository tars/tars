var projectConfig = require('../../projectConfig');
var projectConfigTemlater = projectConfig.templater.toLowerCase();
var templaterName = '';

/**
 * Set templates extension
 * @return {string} Templater name
 */
module.exports = function() {
    if (projectConfigTemlater === 'jade') {
        templaterName = 'jade';
    } else if (projectConfigTemlater === 'handlebars'
            || projectConfigTemlater === 'handelbars'
            || projectConfigTemlater === 'hdb'
            || projectConfigTemlater === 'hb') {
        templaterName = 'handlebars';
    } else {
        templaterName = 'jade';
    }

    return templaterName;
}