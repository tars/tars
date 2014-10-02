// Set templates extension
var projectConfig = require('../../projectConfig'),                 // Project config
    projectConfigTemlater = projectConfig.templater.toLowerCase(),
    templaterName = '';

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