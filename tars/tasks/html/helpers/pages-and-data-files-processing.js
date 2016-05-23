'use strict';

const through2 = tars.packages.through2;
const File = tars.packages.gutil.File;
const path = require('path');
const Buffer = require('buffer').Buffer;

/**
 * Strip 'data = {' and '};' from data-file content
 * @param  {String} content Content of data-file to processing
 * @return {String}         Processed data-file content
 */
function dataFileProcessing(content) {
    return content.replace(/^[\w\s-]+?=\s*?{\s*([\S\s]*)\s*}\s*?;?$/m, '$1');
}

module.exports = function pagesAndDataFilesProcessing() {
    let hrefArray = [];
    let pageNameArray = [];

    return through2.obj(function (file, enc, callback) {
        const parsedFileRelativePath = path.parse(file.relative);
        const fileName = parsedFileRelativePath.base;
        const fileContent = file.contents.toString();
        const pathParts = parsedFileRelativePath.dir.split('/');
        let namePrefix = '';

        if (pathParts.length > 2) {
            namePrefix = pathParts.slice(0, -2).join('_') + '_';
        }

        switch (fileName) {
            case 'data.js':
                if (fileContent.search(/^[\w\s-]+?=/) === 0) {
                    file.contents = new Buffer(namePrefix + dataFileProcessing(fileContent));
                }

                if (file.contents.toString().replace(/\s/g, '').length) {
                    this.push(file); // eslint-disable-line no-invalid-this
                }
                break;
            case 'symbols-data-template.js':
                this.push(file); // eslint-disable-line no-invalid-this
                break;
            default:
                if (parsedFileRelativePath.dir) {
                    parsedFileRelativePath.dir += '/';
                }

                hrefArray.push(`${parsedFileRelativePath.dir}${parsedFileRelativePath.name}.html`);
                pageNameArray.push(parsedFileRelativePath.dir + parsedFileRelativePath.name);
                break;
        }

        return callback();
    }, function (callback) {
        let pagesListFileContent = '__pages: [';

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
};
