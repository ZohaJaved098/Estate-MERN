// our error handler
export const errorHandler = (statusCode, message) => {
  const error = new Error(message); //built-in Error constructor
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
// will use it later
