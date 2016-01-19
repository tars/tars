'use strict';

const through2 = tars.packages.through2;
const File = tars.packages.gutil.File;
const path = require('path');
const Buffer = require('buffer').Buffer;

/**
 * Generate a list of all pages in project
 */
module.exports = function generatePageStructure() {
    var hrefArray = [];
    var pageNameArray = [];

    return through2.obj(function (file, enc, callback) {
        const parsedFileRelativePath = path.parse(file.relative);

        // If current file is data.js file, just pass it through
        if (parsedFileRelativePath.base === 'data.js') {
            this.push(file); // eslint-disable-line no-invalid-this
        } else {
            if (parsedFileRelativePath.dir) {
                parsedFileRelativePath.dir += '/';
            }

            hrefArray.push('./' + parsedFileRelativePath.dir + parsedFileRelativePath.name + '.html');
            pageNameArray.push(parsedFileRelativePath.dir + parsedFileRelativePath.name);
        }

        return callback();
    }, function (callback)  {
        var pagesListFileContent =  '__pages: [';

        hrefArray.forEach((value, index) => {
            if (index) {
                pagesListFileContent += ',';
            }

            pagesListFileContent += `{
                name: '${pageNameArray[index]}',
                href: '${value}'
             }`;
        });
        pagesListFileContent += ']';

        const pagesListFile = new File({
            base: './pages/',
            cwd: __dirname,
            path: './pages/all',
            contents: new Buffer(pagesListFileContent)
        });

        this.push(pagesListFile); // eslint-disable-line no-invalid-this

        return callback();
    });
}
