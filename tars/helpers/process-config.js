var fs = require('fs'),
    gutil = require('gulp-util'),
    config = require('../../tars-config.js');

// Registry of modules
var tarsModules = {
    'jade': 'https://github.com/artem-malko/tars-jade',
    'handlebars': 'https://github.com/artem-malko/tars-handlebars',
    'stylus': 'https://github.com/artem-malko/tars-stylus',
    'less': 'https://github.com/artem-malko/tars-less',
    'scss': 'https://github.com/artem-malko/tars-scss'
};

module.exports = function () {
    // Names
    var templater = typeof config.templater === 'string' && config.templater.toLowerCase();
    var processor = typeof config.cssPreprocessor === 'string' && config.cssPreprocessor.toLowerCase();

    // Check modules valid
    if(typeof tarsModules[templater] !== 'string') {
        throw new gutil.PluginError('TARS', [
                gutil.colors.blue('"' + config.templater + '"'),
                gutil.colors.red(' is invalid templater, please check '),
                gutil.colors.magenta('tars-config.js')
            ].join(''));
    }

    if(typeof tarsModules[processor] !== 'string') {
        throw new gutil.PluginError('TARS', [
                gutil.colors.blue('"' + config.cssPreprocessor + '"'),
                gutil.colors.red(' is invalid processor, please check '),
                gutil.colors.magenta('tars-config.js')
            ].join(''));
    }

    // Apply names to config
    config.templater = templater;
    config.processor = processor;

    // Repositories
    config.templaterRepo = tarsModules[templater];
    config.processorRepo = tarsModules[processor];

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
