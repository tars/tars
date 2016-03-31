'use strict';

const notify = tars.packages.notify;
const gutil = tars.packages.gutil;
const notifyConfig = tars.config.notifyConfig;
const path = require('path');

function cutUselessLog(error) {
    return error.message.replace(/(at\sParser\.pp\.raise[\s\S]*)/, '');
}

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
    error(message, error, params) {
        message = message || 'Something is happen while working.';
        error = error || new Error();
        params = params || {};

        const resultMessage = '\n' + message + '\nLook in the console for details.\n';

        if (!(error instanceof(Error))) {
            error = new Error(error);
        }

        if (process.env.NODE_ENV !== 'production' && !process.env.DISABLE_NOTIFIER) {
            notify.onError({
                sound: notifyConfig.sounds.onError,
                title: notifyConfig.title,
                message: resultMessage,
                icon: path.resolve(tars.root + '/icons/tars_error.png'),
                onLast: true
            })(error);
        } else {
            console.error(gutil.colors.red(message + '\n'));
        }

        if (error.message) {
            console.log(gutil.colors.underline.red('Error details:\n'));
            console.error(cutUselessLog(error));
            console.log(gutil.colors.red('_______________\n'));
        }

        return tars.packages.gutil.noop();
    },

    /**
     * On success notifier
     * @param  {String}  message  Success message
     * @param  {Boolean} onLast   Use notify only on last changed file
     * @return {Pipe}
     */
    success(message, params) {

        if (notifyConfig.useNotify && tars.options.notify && process.env.NODE_ENV !== 'production') {
            params = params || {};

            const defaultConfig = {
                sound: notifyConfig.sounds.onSuccess,
                title: notifyConfig.title,
                templateOptions: {
                    date: tars.helpers.dateFormatter.getTimeOfModify()
                },
                icon: path.resolve(tars.root + '/icons/tars.png')
            };
            let resultMessage = message + '\n' || 'Task\'ve been finished\n';

            resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

            if (params.notStream) {
                return notify(defaultConfig).write(resultMessage);
            }

            return notify(
                Object.assign(
                    defaultConfig,
                    {
                        onLast: params.onLast || true,
                        message: resultMessage
                    }
                )
            );
        }

        return tars.packages.gutil.noop();
    }
};
