'use strict';

const Handlebars = tars.packages.handlebars;

const Dates = require('./utils/dates');
const Utils = require('./utils/utils');

const builtInHandlebarsHelpers = {
    /**
     * Repeat  helper
     * @param  {Number} n       number of iterations
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    repeat(n, options) {
        options = options || {};

        const count = n - 1;
        let content = '';


        for (let index = 0; index <= count; index++) {
            options.data.index = index;
            content += options.fn(this, { data: options.data });
        }
        return new Handlebars.SafeString(content);
    },

    /**
     * If helper with params
     * @param  {[type]} a        [description]
     * @param  {[type]} b        [description]
     * @param  {String} options  operation
     * @return {[type]}          [description]
     */
    is(leftOperand, operation, rightOperand, options) {
        const a = leftOperand || false;
        const b = rightOperand || false;

        if (operation && typeof operation === 'string') {
            switch (operation) {

                // Not strictly equal
                case '==':
                    if (a == b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // Strictly equal
                case '===':
                    if (a === b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a > b checking
                case '>':
                    if (a > b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a >= b checking
                case '>=':
                    if (a >= b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a < b checking
                case '<':
                    if (a < b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a <= b checking
                case '<=':
                    if (a <= b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a != b checking
                case '!=':
                    if (a != b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // a !== b checking
                case '!==':
                    if (a !== b) {
                        return options.fn(this);
                    } else {
                        return options.inverse(this);
                    }
                    break;

                // Action, if operation is unknown
                default:
                    throw new Error(
                        'Operation is unknown!\n"is" helper supports only:\n' +
                        '"==",\n' +
                        '"===",\n' +
                        '">",\n' +
                        '">=",\n' +
                        '"<",\n' +
                        '"<=",\n' +
                        '"!=",\n' +
                        '"!==",\n'
                    );
            }
        } else {
            throw new Error('Operation has to be received to "is" helper and has to be a string');
        }

    },

    /**
     * Str to lower case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    toLowerCase(str) {
        str = Utils.castToString(str);

        return str.toLowerCase();
    },

    /**
     * Str to upper case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    toUpperCase(str) {
        str = Utils.castToString(str);

        return str.toUpperCase();
    },

    /**
     * Capitalize first symbol of str
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    capitalizeFirst(str) {
        str = Utils.castToString(str);

        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Remove whitespaces from received data to helper
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    strip(options) {
        options = options || {};

        let _data = {};

        if (options._data) {
            _data = Handlebars.createFrame(options._data);
        }

        const content = options.fn(this, {data: _data}).replace(/>(\s+)</g, '><');

        return new Handlebars.SafeString(content);
    },

    /**
     * Create template for symbol including
     * @param  {Object} options             Params for template
     * @param  {String} options.iconName    The name of used icon
     * @param  {String} options.className   Classname for svg element
     * @param  {String} options.iconWidth   Width for svg element
     * @param  {String} options.iconHeight  Height for svg element
     * @return {String}                     Compiled Handlebars template
     */
    Icon(options) {
        const iconName = options.hash.iconName;
        let pathToSymbolsSprite = '';

        if (!iconName) {
            throw new Error('iconName has to be received to "icon" helper and has to be a string');
        }

        const iconData = options.data.root.__iconsData[iconName];
        const symbolsConfig = tars.config.svg.symbolsConfig;
        const symbolsSpriteFileName = `svg-symbols${tars.options.build.hash}.svg`;

        if (!iconData) {
            throw new Error('There is no icon with name: ' + iconName);
        }

        if (symbolsConfig.loadingType === 'separate-file-with-link') {
            pathToSymbolsSprite = symbolsConfig.pathToExternalSymbolsFile + symbolsSpriteFileName;
        }

        pathToSymbolsSprite += '#' + iconName;

        const className = options.hash.className || 'icon__' + iconName;
        const iconWidth = options.hash.iconWidth || iconData.width;
        const iconHeight = options.hash.iconHeight || iconData.height;
        const content = `
            <svg class="${className}" width="${iconWidth}" height="${iconHeight}">
                <use xlink:href="${pathToSymbolsSprite}"></use>
            </svg>
        `;

        return new Handlebars.SafeString(content);
    },

    /**
     * {{formatDate}}
     * Port of formatDate-js library (http://bit.ly/18eo2xw)
     * @param  {[type]} date   [description]
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
    */
    formatDate(date, format) {
        return Dates.format(new Date(date), format);
    },

    /**
     * {{now}}
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
     */
    now(format) {
        const date = new Date();

        if (Utils.isUndefined(format)) {
            return date;
        } else {
            return Dates.format(date, format);
        }
    },

    /**
     * {{i18n}}
     * @author: Laurent Goderre <https://github.com/LaurentGoderrre>
     * @param  {String} context
     * @param  {Object} options
     * @return {String}
     * @example: <https://github.com/assemble/buttons> (See the "button-i18n" example)
    */
    i18n(context, options) {
        let language = void 0;

        if (typeof context !== 'string') {
            throw 'Key must be of type \'string\'';
        }

        language = (typeof options.hash.language === 'string' ? options.hash.language : this.language);

        if (typeof language === 'undefined') {
            throw 'The \'language\' parameter is not defined';
        }

        if (typeof this[language] === "undefined") {
            throw 'No strings found for language \'" + language + "\'';
        }

        if (typeof this[language][context] === "undefined") {
            throw 'No string for key \'" + context + "\' for language \'" + language + "\'';
        }

        return this[language][context];
    }
};

module.exports = Object.assign(
    builtInHandlebarsHelpers,
    require(tars.root + '/user-tasks/html/helpers/handlebars-helpers')
);
