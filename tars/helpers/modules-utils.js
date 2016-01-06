'use strict';

const path = require('path');
const fs = require('fs');

function findModulesIncluding(fileContent) {
    var index = 1; // default to the first capturing group
    var regex = /\{\{\>\s*(.*)\//gi;
    var match;
    var usedModules = [];

    while (match = regex.exec(fileContent)) {
        if (usedModules.indexOf(match[index]) === -1) {
            usedModules.push(match[index]);
        }
    }

    return usedModules;
}

function getUniqueModules(modulesPerFile) {
    var usedModules = [];

    for (var filePath in modulesPerFile) {
        if (modulesPerFile.hasOwnProperty(filePath) && modulesPerFile[filePath].length) {
            modulesPerFile[filePath].forEach(function (value) {
                if (usedModules.indexOf(value) === -1) {
                    usedModules.push(value);
                }
            });
        }
    }

    return usedModules.sort();
}

/**
 * Load task and watchers
 * @param  {String} dir directory with files
 * @return {Array}      Path to dirs
 */
function getModulesFromFile(params) {
    var action = params.action;
    var fileContent = '';

    switch (action) {
        case 'init':
            fileContent = params.file.contents.toString();
            params.usedModulesPerFile[params.filePath] = findModulesIncluding(fileContent);
            return params.usedModulesPerFile;
        case 'add':
        case 'change':
            fileContent = fs.readFileSync(process.cwd() + path.sep + params.filePath, 'utf8');
            return findModulesIncluding(fileContent);
        case 'delete':
            break;
        default:
            return [];
    };
};

function isEqual(array1, array2) {
    var tempObject = {};
    var i = 0;

    if (array1.length !== array2.length) {
        return false;
    }

    for (; i < array1.length; i++) {
        tempObject[array1[i]] = true;
    }

    for (i = 0; i < array2.length; i++) {
        if (!tempObject[array2[i]]) {
            return false;
        }
    }

    return true;
};

function isUsedModule(moduleName, modulesPerFile) {
    for (var filePath in modulesPerFile) {
        if (modulesPerFile.hasOwnProperty(filePath) && modulesPerFile[filePath].length) {

            if (modulesPerFile[filePath].indexOf(moduleName) > -1) {
                return true;
            }
        }
    }

    return false;
};

function filterModules() {

}

function qwe(fileContent) {
    var foundModules = findModulesIncluding(fileContent);

    if (foundModules.length) {
        qwe(fs.readFileSync(process.cwd() + path.sep + params.filePath, 'utf8'));
    }
};

























function getModulesFromFile(fileContent) {

}

module.exports = {
    getUsedModules: getUniqueModules,
    getUsedModulesFromFile: getModulesFromFile,
    isEqual: isEqual,
    isUsedModule: isUsedModule
};
