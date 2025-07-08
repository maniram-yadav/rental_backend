exports.successResponse = (res, status, data, message = 'Success') => {
  res.status(status).json({
    success: true,
    message,
    data
  });
};


exports.errorResponse = (res, status, message = 'An error occurred') => {
  res.status(status).json({
    success: false,
    message
  });
};