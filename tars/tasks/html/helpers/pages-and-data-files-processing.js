'use strict';

const through2 = tars.packages.through2;
const File = tars.packages.gutil.File;
const path = require('path');
const Buffer = require('buffer').Buffer;
const tarsEnvValue = process.env.TARS_ENV;

/**
 * Strip 'const data = {' and '};' from data-file content or just remove last ;
 * @param  {String} content Content of data-file to processing
 * @return {String}         Processed data-file content
 */
function dataFileProcessing(content) {
    return content
        .replace(/^[\w\s-]+?=\s*?{\s*([\S\s]*)\s*}\s*?;?$/m, '$1')
        .replace(/^'([\w\s-]+)'/, '$1')
        .replace(/;$/m, '');
}

module.exports = function pagesAndDataFilesProcessing() {
    let hrefArray = [];
    let pageNameArray = [];

    return through2.obj(function (file, enc, callback) {
        const parsedFileRelativePath = path.parse(file.relative);
        const fileName = parsedFileRelativePath.base;
        const pathParts = parsedFileRelativePath.dir.split(path.sep);
        let fileContent = file.contents.toString();
        let namePrefix = '';

        if (pathParts.length > 2) {
            namePrefix = pathParts.slice(0, -2).join('_') + '_';
        }

        switch (fileName) {
            case 'data.js':
                // Create new component name for ready data-file
                fileContent = namePrefix + dataFileProcessing(fileContent);

                // Add '' to ready component name
                if (fileContent.search(/^([\w\s-]+)/) === 0) {
                    fileContent = fileContent.replace(/^([\w\s-]+)/, '\'$1\'');
                }

                if (fileContent.replace(/\s/g, '').length) {
                    file.contents = new Buffer(fileContent);
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

        if (tarsEnvValue) {
            this.push(new File({ // eslint-disable-line no-invalid-this
                path: '.',
                contents: new Buffer(`TARS_ENV: '${tarsEnvValue}'`)
            }));
        }

        return callback();
    });
};
