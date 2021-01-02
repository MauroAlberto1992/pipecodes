
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function isValidDate(value) {
    const userDate = new Date(value)
    var date = new Date();

    if (date.addDays(1) < userDate) return true
    return false;
}

module.exports = isValidDate;
