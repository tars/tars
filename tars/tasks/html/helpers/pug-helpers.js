'use strict';

const builtInPugHelpers = {

    /**
     * Icon helper for Jade
     * It returns template for svg-symbols including
     * @param  {Object} options
     * @param  {String} options.iconName    Name of the used icon
     * @param  {String} options.className   Classname for svg element
     * @param  {String} options.iconWidth   Width for svg element
     * @param  {String} options.iconHeight  Height for svg element
     * @return {String}                     Ready template for svg-symbols including
     */
    Icon(options) {
        const iconName = options.iconName;
        let pathToSymbolsSprite = '';

        if (!iconName) {
            throw new Error('iconName has to be received to "icon" mixin and has to be a string');
        }

        if (!this.__iconsData) {
            throw new Error('please, ensure that "symbols" is set in tars.config.svg.workflow');
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

        pathToSymbolsSprite += `#${iconName}`;

        const className = options.className || `icon__${iconName}`;
        const iconWidth = options.iconWidth || iconData.width;
        const iconHeight = options.iconHeight || iconData.height;
        return `
            <svg class="${className}" width="${iconWidth}" height="${iconHeight}">
                <use xlink:href="${pathToSymbolsSprite}"></use>
            </svg>
        `;
    }
};

let userHelpers;

try {
    userHelpers = require(`${tars.root}/user-tasks/html/helpers/pug-helpers`);
} catch (error) {
    userHelpers = {};
}

module.exports = Object.assign(
    builtInPugHelpers,
    userHelpers
);
