// Set templates extension
var projectConfig = require('../../projectConfig'),                 // Project config
    projectConfigTemlater = projectConfig.templater.toLowerCase(),
    templateExtension = '';

module.exports = function() {
    if (projectConfigTemlater === 'jade') {
        templateExtension = 'jade';
    } else if (projectConfigTemlater === 'handlebars' 
            || projectConfigTemlater === 'handelbars' 
            || projectConfigTemlater === 'hdb' 
            || projectConfigTemlater === 'hb') {
        templateExtension = 'handlebars';
    } else {
        templateExtension = 'jade';
    }

    return templateExtension;
}