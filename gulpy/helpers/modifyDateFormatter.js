// Date formatter for Gulp notify. It showes only hours, minutes and seconds
var dateFormatter = {
    getTimeOfModify: function() {
        var modifyDate = '',
        currentDate = new Date(),
        hours = currentDate.getHours(),
        minutes = currentDate.getMinutes(),
        seconds = currentDate.getSeconds();

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        modifyDate = hours + ':' + minutes + ':' + seconds;

        return modifyDate;
    }
}

if (typeof module != 'undefined') {
    module.exports = dateFormatter;
}