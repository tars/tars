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
    var subconfig = { config: config };

    // Module names
    subconfig.templater = typeof config.templater === 'string' && config.templater.toLowerCase();
    subconfig.processor = typeof config.cssPreprocessor === 'string' && config.cssPreprocessor.toLowerCase();

    // Check module valid
    if(typeof tarsModules[subconfig.templater] !== 'string') {
        throw new gutil.PluginError('TARS', [
                gutil.colors.blue('"' + config.templater + '"'),
                gutil.colors.red(' is invalid templater, please check '),
                gutil.colors.magenta('tars-config.js')
            ].join(''));
    }

    if(typeof tarsModules[subconfig.processor] !== 'string') {
        throw new gutil.PluginError('TARS', [
                gutil.colors.blue('"' + config.cssPreprocessor + '"'),
                gutil.colors.red(' is invalid processor, please check '),
                gutil.colors.magenta('tars-config.js')
            ].join(''));
    }

    // Repositories
    subconfig.templaterRepo = tarsModules[subconfig.templater];
    subconfig.processorRepo = tarsModules[subconfig.processor];

    // Set template's extension
    switch(subconfig.templater) {
        // case 'handlebars':
            // subconfig.templateExtension = 'hbs';
            // break;
        case 'jade':
            subconfig.templateExtension = 'jade';
            break;
        default:
            subconfig.templateExtension = 'html';
            break;
    }

    // Set processor's extension
    switch(subconfig.processor) {
        case 'stylus':
            subconfig.styleExtention = 'styl';
            break;
        case 'scss':
            subconfig.styleExtention = 'scss';
            break;
        case 'less':
            subconfig.styleExtention = 'less';
            break;
        default:
            subconfig.styleExtention = 'css';
            break;
    }

    return subconfig;
};
