'use strict';

/**
 * You can add your own helpers to pugHelpers Object
 * All helpers from that object will be available in templates
 * @type {Object}
 */
const pugHelpers = {

    /**
     * This is an example of handlebars-helper
     * This helper gets string and returns it
     * @param  {String} str Source string
     * @return {String}     Result string
     */
    exampleHelper: function (str) {
        return str;
    }
};

module.exports = pugHelpers;
