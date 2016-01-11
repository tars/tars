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
    repeat: function (n, options) {
        options = options || {};

        var _data = {};
        var content = '';
        var count = n - 1;

        if (options._data) {
            _data = Handlebars.createFrame(options._data);
        }

        for (let index = 0; index <= count; index++) {
            _data = { index };
            content += options.fn(this, { data: _data });
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
    is: function (leftOperand, operation, rightOperand, options) {
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

                // Action, if operation is unknown
                default:
                    throw new Error(
                        'Operation is unknown!\n"is" helper supports only:\n' +
                        '"==",\n' +
                        '"===",\n' +
                        '">",\n' +
                        '">=",\n' +
                        '"<",\n' +
                        '"<=",\n'
                    );
            }
        } else {
            throw new Error('Operation have to be recived and have to be a string');
        }

    },

    /**
     * Str to lower case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    toLowerCase: str => {
        str = Utils.castToString(str);

        return str.toLowerCase();
    },

    /**
     * Str to upper case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    toUpperCase: str => {
        str = Utils.castToString(str);

        return str.toUpperCase();
    },

    /**
     * Capitalize first symbol of str
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    capitalizeFirst: str => {
        str = Utils.castToString(str);

        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Remove whitespaces from recived data to helper
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    strip: function (options) {
        options = options || {};

        var _data = {};

        if (options._data) {
            _data = Handlebars.createFrame(options._data);
        }

        const content = options.fn(this, {data: _data}).replace(/>(\s+)</g, '><');

        return new Handlebars.SafeString(content);
    },

    /**
     * {{formatData}}
     * Port of formatDate-js library (http://bit.ly/18eo2xw)
     * @param  {[type]} date   [description]
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
    */
    formatDate: (date, format) => {
        return Dates.format(new Date(date), format);
    },

    /**
     * {{now}}
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
     */
    now: format => {
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
    i18n: function (context, options) {
        var language = void 0;

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
