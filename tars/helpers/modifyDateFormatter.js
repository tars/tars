/**
 * Date formatter for Gulp notify. It showes only hours, minutes and seconds
 * @param  {number} timeItem hours, minutes or seconds
 * @return {string}          String with formatted time
 */
function formatTime(timeItem) {
    if (timeItem < 10) {
        timeItem = '0' + timeItem;
    }
    return timeItem;
}

var dateFormatter = {
    /**
     * Get time of last modify of something (css, js and etc)
     * @return {string} String with formatted time
     */
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