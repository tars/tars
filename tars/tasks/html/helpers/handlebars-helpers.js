'use strict';

var Handlebars = tars.packages.handlebars;
var digits = tars.packages.digits;

var Dates = require('./utils/dates');
var Utils = require('./utils/utils');

var helpers = {
    /**
     * Repeat  helper
     * @param  {Number} n       number of iterations
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    repeat: function (n, options) {
        options = options || {};
        var _data = {},
            content = '',
            count = n - 1;

        if (options._data) {
            _data = Handlebars.createFrame(options._data);
        }

        for (var i = 0; i <= count; i++) {
            _data = {
                index: digits.pad((i + 1), { auto: n })
            };
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
        var a = leftOperand || false,
            b = rightOperand || false;

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
    toLowerCase: function (str) {
        if (typeof str != 'string') {
            str.toString();
        }

        return str.toLowerCase();
    },

    /**
     * Str to upper case
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    toUpperCase: function (str) {
        if (typeof str != 'string') {
            str.toString();
        }

        return str.toUpperCase();
    },

    /**
     * Capitalize first symbol of str
     * @param  {String} str [description]
     * @return {[type]}     [description]
     */
    capitalizeFirst: function (str) {
        if (typeof str != 'string') {
            str.toString();
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Remove whitespaces from recived data to helper
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    strip: function (options) {
        options = options || {};

        var _data = {},
            content = '';

        if (options._data) {
            _data = Handlebars.createFrame(options._data);
        }

        content = options.fn(this, {data: _data}).replace(/>(\s+)</g, '><');

        return new Handlebars.SafeString(content);
    },

    /**
     * {{formatData}}
     * Port of formatDate-js library (http://bit.ly/18eo2xw)
     * @param  {[type]} date   [description]
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
    */
    formatDate: function (date, format) {
        date = new Date(date);
        return Dates.format(date, format);
    },

    /**
     * {{now}}
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
     */
    now: function (format) {
        var date = new Date();
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

module.exports = helpers;
