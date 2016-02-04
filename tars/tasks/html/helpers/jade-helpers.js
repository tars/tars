'use strict';

const builtInJadeHelpers = {

    /**
     * Icon helper for Jade
     * It returns template for svg-symbols including
     * @param  {Object} options
     * @param  {String} options.iconName    Name of the used icon
     * @param  {String} options.className   Classname for svg element
     * @return {String}                     Ready template for svg-symbols including
     */
    Icon(options) {
        const iconName = options.iconName;
        let pathToSymbolsSprite = '';

        if (!iconName) {
            throw new Error('iconName has to be received to "icon" mixin and has to be a string');
        }

        const iconData = this.__iconsData[iconName];
        const symbolsConfig = tars.config.svg.symbolsConfig;
        const symbolsSpriteFileName = `svg-symbols${tars.options.build.hash}.svg`;

        if (!iconData) {
            throw new Error('There is no icon with name: ' + iconName);
        }

        if (symbolsConfig.loadingType === 'separate-file-with-link') {
            pathToSymbolsSprite = symbolsConfig.pathToExternalSymbolsFile + symbolsSpriteFileName;
        }

        pathToSymbolsSprite += '#' + iconName;

        const className = options.className || 'icon__' + iconName;

        return `
            <svg class="${className}" width="${iconData.width}" height="${iconData.height}">
                <use xlink:href="${pathToSymbolsSprite}"></use>
            </svg>
        `;
    }
};

module.exports = Object.assign(
    builtInJadeHelpers,
    require(tars.root + '/user-tasks/html/helpers/jade-helpers')
);
