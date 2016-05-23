const notifier = tars.helpers.notifier;
const fs = require('fs');

/**
 * Create files with mixins, when you do not have images for sprites
 * @param  {Object} params
 */
module.exports = function actionsOnSpriteTaskSkipping(params) {
    const blankFilePath = params.blankFilePath;
    const fileWithMixinsPath = params.fileWithMixinsPath;
    const doneCallback = params.done;
    const errorText = params.errorText;

    Promise.resolve()
        .then(() => {
            return new Promise((resolve, reject) => {
                fs.readFile(fileWithMixinsPath, 'utf8', (error, data) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(data);
                });
            });
        })
        .then(mixinsContent => {
            return new Promise((resolve, reject) => {
                fs.writeFile(blankFilePath, mixinsContent, error => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
            });
        })
        .then(() => doneCallback(null))
        .catch(error => {
            doneCallback(error);
            return notifier.error(errorText, error);
        });
};
