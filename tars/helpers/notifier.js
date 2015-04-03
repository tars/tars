var notify = require('gulp-notify');
var notifyConfig = require('../../tars-config').notifyConfig;
var modifyDate = require('./modify-date-formatter');

module.exports = function(message, onLast) {
    var resultMessage = message + '\n' || 'Task\'ve been finished\n';

    resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

    if (notifyConfig.useNotify) {
        return notify({
            onLast: onLast || true,
            sound: notifyConfig.sounds.onSuccess,
            title: notifyConfig.title,
            message: resultMessage,
            templateOptions: {
                date: modifyDate.getTimeOfModify()
            }
        });
    }
};