'use strict';

var notifyConfig = tars.config.notifyConfig;

module.exports = function (message, onLast) {
    var resultMessage = message + '\n' || 'Task\'ve been finished\n';

    resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

    if (notifyConfig.useNotify) {
        return tars.packages.notify({
            onLast: onLast || true,
            sound: notifyConfig.sounds.onSuccess,
            title: notifyConfig.title,
            message: resultMessage,
            templateOptions: {
                date: tars.helpers.dateFormatter.getTimeOfModify()
            }
        });
    } else {
        return tars.packages.gutil.noop();
    }
};
