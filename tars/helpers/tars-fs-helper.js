'use strict';

const fs = require('fs');
const path = require('path');

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
    return !pathToFile.match(/example-|[\/\\]helpers[\/\\]/i)
            && !file.match(/^_/) && pathToFile.match(/js$/i);
}

/**
 * Get hashmap of files and path to that files
 * @param  {String} dir Folder to read
 * @return {Object}     Hashmap of files and paths to that files
 */
function getFilesFromDir(dir) {
    const list = fs.readdirSync(dir);
    let results = {};

    list.forEach(file => {
        const fullPathToFile = dir + '/' + file;
        const stat = fs.statSync(fullPathToFile);

        if (stat && stat.isDirectory()) {
            results = Object.assign(results, getFilesFromDir(fullPathToFile));
        } else {
            if (isValidFile(fullPathToFile, file)) {
                results[path.parse(dir).name + '/' + file] = fullPathToFile;
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

module.exports = {
    /**
      * Get paths to all tasks, user's and system
      * @return {Array} Array of unique system/user's tasks
      */
    getTasks() {
        const systemTasks = getFilesFromDir(tars.root + '/tasks');
        const userTasks = getFilesFromDir(tars.root + '/user-tasks');
        const readyTasksArray = getReadyUniqueItemsArray(systemTasks, userTasks);

        return readyTasksArray;
    },

    /**
      * Get paths to all watchers, user's and system
      * @return {Array} Array of unique system/user's watchers
      */
    getWatchers() {
        const systemWatchers = getFilesFromDir(tars.root + '/watchers');
        const userWatchers = getFilesFromDir(tars.root + '/user-watchers');
        const readyWatchersArray = getReadyUniqueItemsArray(systemWatchers, userWatchers);

        return readyWatchersArray;
    }
};
