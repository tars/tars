var fs = require('fs'),
    config = require('../../tars-config.js');

var tarsModules = {
    'jade': 'https://github.com/artem-malko/tars-jade',
    'handlebars': 'https://github.com/artem-malko/tars-handlebars',
    'stylus': 'https://github.com/artem-malko/tars-stylus',
    'less': 'https://github.com/artem-malko/tars-less',
    'scss': 'https://github.com/artem-malko/tars-scss'
};

module.exports = function () {
    config.templater = typeof config.templater === 'string' && config.templater.toLowerCase();
    config.processor = typeof config.cssPreprocessor === 'string' && config.cssPreprocessor.toLowerCase();

    config.templaterRepo = tarsModules[config.templater] || false;
    config.processorRepo = tarsModules[config.processor] || false;

    // Set template's extension
    switch(config.templater) {
        // case 'handlebars':
            // config.templateExtension = 'hbs';
            // break;
        case 'jade':
            config.templateExtension = 'jade';
            break;
        default:
            config.templateExtension = 'html';
            break;
    }

    // Set processor's extension
    switch(config.processor) {
        case 'stylus':
            config.styleExtention = 'styl';
            break;
        case 'scss':
            config.styleExtention = 'scss';
            break;
        case 'less':
            config.styleExtention = 'less';
            break;
        default:
            config.styleExtention = 'css';
            break;
    }

    return config;
};
