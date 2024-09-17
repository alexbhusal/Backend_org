const AppError = require('./AppError');
const jwt = require('jsonwebtoken');
const multer = require('multer');

function handleDuplicateError(error) {
  const regex = /Duplicate entry '([^']+)'/;
  const duplicateField = error?.sqlMessage.match(regex);
  const message = `Account already exists with ${duplicateField[1]}`;
  return new AppError(message, 400);
}

function handleNullError(error) {
  const regex = /Column '([^']+)'/;
  const nullField = error?.sqlMessage.match(regex);
  const message = `Please provide ${nullField[1]}`;
  return new AppError(message, 400);
}

function handleDataTooLongError(error) {
  const regex = /Data too long for column '([^']+)'/;
  const columnName = error?.sqlMessage.match(regex);
  const message = columnName
    ? `Data too long for field ${columnName[1]}.`
    : 'Data too long.';
  return new AppError(message, 400);
}

function handleForeignKeyError(error) {
  const regex = /FOREIGN KEY \(`([^`]+)`\)/;
  const fieldName = error?.sqlMessage.match(regex);
  const message = fieldName
    ? `Invalid reference for field ${fieldName[1]}.`
    : 'Invalid foreign key reference.';
  return new AppError(message, 400);
}

function handleInvalidDataTypeError(error) {
  const regex = /Incorrect (.+) value: '([^']+)' for column '([^']+)'/;
  const match = error?.sqlMessage.match(regex);
  const message = match
    ? `Invalid data type for field ${match[3]}. Expected ${match[1]}.`
    : 'Invalid data type provided.';
  return new AppError(message, 400);
}

function handleAccessDeniedError(error) {
  const message = 'Access denied. Please check your credentials.';
  return new AppError(message, 403);
}

function handleServerGoneAwayError(error) {
  const message = 'server has gone away.';
  return new AppError(message, 500);
}

function handleConnectionLostError(error) {
  const message = 'Request Failed due to lost connection.';
  return new AppError(message, 500);
}

function handleJwtExpiredError() {
  const message = 'Your session has expired. Please log in again.';
  return new AppError(message, 401);
}

function handleMulterFileLimitError(error) {
  const message = `File size exceeds the limit. Please upload a smaller file.`;
  return new AppError(message, 400);
}

function handleMulterFileTypeError() {
  const message = 'Invalid file type. Please upload a valid file.';
  return new AppError(message, 400);
}

function ErrorHandler(err, req, res, next) {
  console.log(err);

  if (err?.errno === 1062) err = handleDuplicateError(err);
  if (err?.errno === 1048) err = handleNullError(err);
  if (err?.errno === 1406) err = handleDataTooLongError(err);
  if (err?.errno === 1452) err = handleForeignKeyError(err);
  if (err?.errno === 1292) err = handleInvalidDataTypeError(err);
  if (err?.errno === 1045) err = handleAccessDeniedError(err);
  if (err?.errno === 2006) err = handleServerGoneAwayError(err);
  if (err?.errno === 2013) err = handleConnectionLostError(err);

  if (err instanceof jwt.TokenExpiredError) err = handleJwtExpiredError();

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      err = handleMulterFileLimitError(err);
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      err = handleMulterFileTypeError(err);
    }
  }

  if (err instanceof AppError) {
    return res?.status(err.statusCode).json({
      status: err?.status,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res?.status(500).json({
      status: 'error',
      message: err.message,
      stack: err.stack,
    });
  }
}

module.exports = ErrorHandler;
