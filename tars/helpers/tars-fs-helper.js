'use strict';

const fs = require('fs');

/**
 * Check, that file is task or watcher
 * All files with
 * 1) "example-" in name or path;
 * 2) "/helpers/" in path;
 * 3) start from _ char;
 * All that files won't be used
 * @param  {String}  pathToFile Path to file to check
 * @param  {String}  file       File to check
 * @return {Boolean}            Is file task or watcher
 */
function isValidFile(pathToFile, file) {
    return !pathToFile.match(/example-/) && !pathToFile.match(/\/helpers\//)
            && !file.match(/^_/) && pathToFile.match(/.js$/);
}

/**
 * Get hashmap of files and path to that files
 * @param  {String} dir Folder to read
 * @return {Object}     Hashmap of files and paths to that files
 */
function getFilesFromDir(dir) {
    const list = fs.readdirSync(dir);
    var results = {};

    list.forEach(file => {
        const fullPathToFile = dir + '/' + file;
        const stat = fs.statSync(fullPathToFile);

        if (stat && stat.isDirectory()) {
            results = Object.assign(results, getFilesFromDir(fullPathToFile))
        } else {
            if (isValidFile(fullPathToFile, file)) {
                results[dir.match(/([\w-]+)$/i)[1] + file] = fullPathToFile;
            }
        }
    });

    return results;
}

/**
 * Merge two objects from arguments and make array from ready object
 * @param  {Object} systemItems System tasks/watchers
 * @param  {Object} usersItems  User's tasks/watchers
 * @return {Array}              Array of unique system/user's tasks/watchers
 */
function getReadyUniqueItemsArray(systemItems, usersItems) {
    const uniqueItems = Object.assign(systemItems, usersItems);

    return Object.keys(uniqueItems).map(key => uniqueItems[key]);
}

/**
 * Load tasks
 * @param  {String} dir directory with files
 * @return {Array}      Path to dirs
 */

 /**
  * Get paths to all tasks, user's and system
  * @return {Array} Array of unique system/user's tasks
  */
exports.getTasks = () => {
    const systemTasks = getFilesFromDir('./tars/tasks');
    const userTasks = getFilesFromDir('./tars/user-tasks');
    const readyTasksArray = getReadyUniqueItemsArray(systemTasks, userTasks);

    return readyTasksArray;
};

/**
  * Get paths to all watchers, user's and system
  * @return {Array} Array of unique system/user's watchers
  */
exports.getWatchers = () => {
    const systemWatchers = getFilesFromDir('./tars/watchers');
    const userWatchers = getFilesFromDir('./tars/user-watchers');
    const readyWatchersArray = getReadyUniqueItemsArray(systemWatchers, userWatchers);

    return readyWatchersArray;
};
