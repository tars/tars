'use strict';

const through2 = tars.packages.through2;
const path = require('path');
const Buffer = require('buffer').Buffer;

/**
 * Generate static path for pages
 */
module.exports = function generateStaticPath() {

    return through2.obj(function (file, enc, callback) {
        // Get all directories array for current page from page directory
        const directoriesArray = path.parse(file.relative).dir.split(path.sep);
        // Generate static path as '../' as many times, as directories array length + tars.config.staticPrefix
        const staticPath = directoriesArray.map(() => '../').join('') + tars.config.staticPrefix;
        const newPageContent = file.contents.toString().replace(
            /%=staticPrefix=%|%=static=%|__static__/g, staticPath
        );

        file.contents = new Buffer(newPageContent);

        this.push(file); // eslint-disable-line no-invalid-this

        return callback();
    }, callback =>  callback());
}
