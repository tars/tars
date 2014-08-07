// Generator for build version name. It just uses current Date.
generatedBuildVersion = '';

var buildVersion = {
    generateBuildVersion: function() {
        generatedBuildVersion = '_ver-' + (new Date()).toString();
        generatedBuildVersion = generatedBuildVersion.replace(/ /g,'_');
        generatedBuildVersion = generatedBuildVersion.replace(/:/g,'-');

        this.newBuildVersion = generatedBuildVersion;
    },

    newBuildVersion: generatedBuildVersion
}

if (typeof module != 'undefined') {
    module.exports = buildVersion;
}