function isValidDate(dateInput) {
  const dateObject = new Date(dateInput); // dateInput can be a string or multiple arguments (year, month, day)
  return !isNaN(dateObject.getTime());
}

exports.isValidDate = isValidDate;