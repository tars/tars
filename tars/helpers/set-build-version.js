/**
 * Generate build version
 * @return {String} build version
 */
module.exports = function () {
    var buildVerion = '_ver-' + (new Date()).toString();

    // build version is current date without spaces (replaced to _) and without time zone info.
    // You could change it.
    buildVerion = buildVerion.replace(/ /g, '_').replace(/:/g, '-').match(/.*\d\d-\d\d-\d\d/)[0];

    return buildVerion;
};