'use strict';

/**
 * Helper for watcher logging
 * @param  {String} event Type of event
 * @param  {String} path  Path of changed file
 */
module.exports = {
    /**
     * Capitalize first letter of a string
     * @param  {String} str String to modify
     * @return {String}     String, with the first letter capitalized
     */
    capitalizeFirstLetter(str) {
        str = str && String(str) || '';

        return str.charAt(0).toUpperCase() + str.substr(1);
    }
};
