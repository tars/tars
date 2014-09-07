// Generator for build version name. It just uses current Date.
generatedBuildVersion = '';

var buildVersion = {
    generateBuildVersion: function() {
        generatedBuildVersion = '_ver-' + (new Date()).toString();
        generatedBuildVersion = generatedBuildVersion.replace(/ /g,'_');
        generatedBuildVersion = generatedBuildVersion.replace(/:/g,'-');
        generatedBuildVersion = generatedBuildVersion.match(/.*\d\d-\d\d-\d\d/)[0];

        this.newBuildVersion = generatedBuildVersion;
    },

    newBuildVersion: generatedBuildVersion
}

module.exports = buildVersion;