const createHttpError = require('http-errors');
const { ValidationError, BaseError } = require('sequelize');

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(422).send(err.errors);
  }

  if (err instanceof BaseError) {
    return next(createHttpError(500, 'DatabaseError'));
  }

  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;

  const message = err.message ?? 'Server Error';

  res.status(status).send(message);
};
