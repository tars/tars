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
        const pageDepth = directoriesArray.map(value => { if (value) return '../' })
        const staticPath = pageDepth.join('') + tars.config.staticPrefix;
        let newPageContent = file.contents.toString().replace(
            /%=staticPrefix=%|%=static=%|__static__/g, staticPath
        );

        newPageContent = newPageContent.replace(
            /xlink:href="(.*)"/gim, (str, $1) => `xlink:href="${pageDepth.join('') + $1}"`
        );

        file.contents = new Buffer(newPageContent);

        this.push(file); // eslint-disable-line no-invalid-this

        return callback();
    }, callback =>  callback());
}
