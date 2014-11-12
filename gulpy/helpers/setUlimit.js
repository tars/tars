/**
 * Set ulimit to 2048 by default
 * @param  {number} limit ulimit value
 */
module.exports = function(limit) {
    limit = limit || 2048;
    var posix;

    try {
        posix = require('posix');
    } catch (ex) {
    }

    if (posix) {
        try {
            posix.setrlimit('nofile', {soft: limit});
            return true;
        } catch (ex) {
        }
    }
    return false;
}