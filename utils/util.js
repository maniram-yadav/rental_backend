
function getDayDifference(startDateString, endDateString) {
    console.log(startDateString,endDateString);
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    console.log("Start Date , End Date : ",startDate,endDate);

    const timeDifferenceMs = endDate - startDate;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysDifference = timeDifferenceMs / millisecondsInADay;

    return Math.floor(daysDifference); 
}

function isValidDate(dateInput) {
  const dateObject = new Date(dateInput);
  return !isNaN(dateObject.getTime());
}

exports.isValidDate = isValidDate;
exports.getDayDifference = getDayDifference;