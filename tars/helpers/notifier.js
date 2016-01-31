'use strict';

const notify = tars.packages.notify;
const notifyConfig = tars.config.notifyConfig;
const path = require('path');

/**
 * Notify helper
 */
module.exports = {
    /**
     * On error notifier
     * @param  {String} message Error message
     * @param  {Error} error    Error object
     * @return {Pipe}
     */
    error(message, error) {
        let resultMessage;

        if (message) {
            resultMessage = '\n' + message + '\nLook in the console for details.\n\n';
        } else {
            resultMessage = '\nSomething is happen while working.\nLook in the console for details.\n\n';
        }

        if (error) {
            resultMessage += error;
        } else {
            error = new Error();
        }

        if (process.env.NODE_ENV !== 'production' && !process.env.DISABLE_NOTIFIER) {
            return notify.onError({
                sound: notifyConfig.sounds.onError,
                title: notifyConfig.title,
                message: resultMessage,
                icon: path.resolve(tars.root + '/icons/tars_error.png'),
                onLast: true
            })(error);
        }

        console.error(resultMessage);
        return tars.packages.gutil.noop();
    },

    /**
     * On success notifier
     * @param  {String}  message  Success message
     * @param  {Boolean} onLast   Use notify only on last changed file
     * @return {Pipe}
     */
    success(message, onLast) {
        let resultMessage = message + '\n' || 'Task\'ve been finished\n';

        resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

        if (notifyConfig.useNotify && tars.options.notify && process.env.NODE_ENV !== 'production') {
            return notify({
                onLast: onLast || true,
                sound: notifyConfig.sounds.onSuccess,
                title: notifyConfig.title,
                message: resultMessage,
                templateOptions: {
                    date: tars.helpers.dateFormatter.getTimeOfModify()
                },
                icon: path.resolve(tars.root + '/icons/tars.png')
            });
        }

        return tars.packages.gutil.noop();
    }
};
