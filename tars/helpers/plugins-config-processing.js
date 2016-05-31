'use strict';

const json = tars.require('comment-json');
const fs = require('fs');
const cwd = process.cwd();

/**
 * Execute function insert() in plugins-config.json
 */
module.exports = function makePluginsConfig() {
    const rawPluginsConfig = json.parse(fs.readFileSync(`${cwd}/plugins-config.json`).toString());
    const stringifiedPluginsConfig = json.stringify(rawPluginsConfig, null, 2);
    const processedPluginsConfig = stringifiedPluginsConfig.replace(
        /insert\(([\w.\-()`\{\/}$\s]+)\)/gi,
        (match, p1) => eval(p1)
    );

    return json.parse(processedPluginsConfig);
};
