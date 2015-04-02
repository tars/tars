var gulp = require('gulp');
var gutil = require('gulp-util');
var Download = require('download');
var Promise = require('bluebird');
var os = require('os');
var options = require('../../../tars/helpers/process-config.js');
var path = require('path');

var version = 'version-' + require('../../../package.json').version;


/**
 * Init builder, download css-preprocessor and templater
 */
gulp.task('service:init', function(cb) {

    if (os.platform() === 'darwin') {
        console.log('\n\n' + gutil.colors.bold('🅃 🄰 🅁 🅂\n'));
    } else {
        console.log('\n\n' + gutil.colors.bold('T A R S\n'));
    }
    console.log(gutil.colors.magenta.bold('Hi, I\'m TARS. I will help you to make awesome markup!\n\n'));
    console.log('You could find more info about me at https://github.com/artem-malko/tars/blob/master/README.md\n');
    console.log('Start your work with \'gulp dev\'\n');

    // Check both modules will be done
    return Promise.all([
        downloadModule(options.templaterRepo, templaterMap),
        downloadModule(options.processorRepo, processorMap),
    ]).then(function () {
        console.log(gutil.colors.green.bold('\n---------------------------------------------------\n'));
        console.log(gutil.colors.green.bold('TARS have been inited successfully!\n'));

        console.log('You choose:');
        console.log(gutil.colors.magenta.bold(options.templater), ' as templater');
        console.log(gutil.colors.magenta.bold(options.processor), ' as css-processor\n');

        console.log(gutil.colors.green.bold('---------------------------------------------------\n'));
    });

});

function templaterMap(file) {
    // tars-name-version
    var segments = file.path.split(path.sep).slice(1),
        filepath = segments.join('/');

    // File filter
    if (filepath.indexOf('markup/') === 0) {
        file.path = segments.slice(1).join(path.sep);
        // Write file
        return this.createStream(file, 'markup');
    }

    // File filter
    if (filepath.indexOf('tars/tasks/') === 0) {
        file.path = segments.slice(2).join(path.sep);
        // Write file
        return this.createStream(file, 'tars/tasks/html');
    }

    return this.createStream(file);
}

function processorMap(file) {
    // tars-name-version
    var segments = file.path.split(path.sep).slice(1),
        filepath = segments.join('/');

    // File filter
    if (filepath.indexOf('markup/static/') === 0) {
        file.path = segments.slice(2).join(path.sep);
        // Write file
        return this.createStream(file, 'markup/' + options.config.fs.staticFolderName);
    }

    // File filter
    if (filepath.indexOf('markup/modules/_template/') === 0) {
        file.path = segments.slice(3).join(path.sep);
        // Write file
        return this.createStream(file, 'markup/modules/_template');
    }

    // File filter
    if (filepath.indexOf('tars/tasks/') === 0) {
        file.path = segments.slice(2).join(path.sep);
        // Write file
        return this.createStream(file, 'tars/tasks/css');
    }

    // Pass
    return this.createStream(file);
}

function downloadModule(repo, map) {
    return new Promise(function (resolve, reject) {
        var url = repo + '/archive/' + version + '.zip';

        // Check exising version branch
        Download().get(url).run(function (err, files) {
            if (err) {
                url = repo + '/archive/master.zip';
            }

            // Download branch
            Download({ extract: true }).get(url).run(function (err, files) {
                if (err) {
                    throw err;
                }

                // Convert files to streams by map and check when all will be done
                Promise.all(files.filter(function (file) {
                    return file.contents.length > 0;
                }).map(map.bind(new Download))).then(resolve);
            });
        });
    });
}
