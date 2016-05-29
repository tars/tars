'use strict';

const through2 = tars.packages.through2;
const path = require('path');

/**
 * Filter files for move-separate js
 */
module.exports = function separateFilesFilter() {

    return through2.obj(function (file, enc, callback) {
        const fileName = path.basename(file.relative);

        switch (fileName) {
            case 'html5shiv-3.7.2.min.js':
                if (tars.flags.ie || tars.flags.ie8) {
                    this.push(file); // eslint-disable-line no-invalid-this
                }
                break;
            case 'svg4everybody.min.js':
                if (
                    tars.config.svg.active && tars.config.svg.workflow === 'symbols' &&
                    tars.config.svg.symbolsConfig.loadingType === 'separate-file-with-link' &&
                    tars.config.svg.symbolsConfig.usePolyfillForExternalSymbols
                ) {
                    this.push(file); // eslint-disable-line no-invalid-this
                }
                break;
            default:
                this.push(file); // eslint-disable-line no-invalid-this
                break;
        }

        return callback();
    }, callback => callback());
};
