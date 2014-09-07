// Date formatter for Gulp notify. It showes only hours, minutes and seconds
function formatTime(timeItem) {
    if (timeItem < 10) {
        timeItem = '0' + timeItem;
    }
    return timeItem;
}

var dateFormatter = {
    getTimeOfModify: function() {
        var modifyDate = '',
            currentDate = new Date(),
            hours = currentDate.getHours(),
            minutes = currentDate.getMinutes(),
            seconds = currentDate.getSeconds();

        modifyDate = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

        return modifyDate;
    }
}

module.exports = dateFormatter;