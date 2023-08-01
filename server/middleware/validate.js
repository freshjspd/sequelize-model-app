const createHttpError = require('http-errors');
const {
  NEW_USER_VALIDATION_SCHEMA,
  UPDATED_USER_VALIDATION_SCHEMA,
} = require('../utils/validationsSchemas');

module.exports.validateUserOnCreate = async (req, res, next) => {
  try {
    const validatedUser = await NEW_USER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validatedUser;
    next();
  } catch (err) {
    // res.status(422).send({ error: err.errors[0] });
    next(createHttpError(422, err.errors[0]));
  }
};

module.exports.validateUserOnUpdate = async (req, res, next) => {
  try {
    const validatedUser = await UPDATED_USER_VALIDATION_SCHEMA.validate(
      req.body
    );
    req.body = validatedUser;
    next();
  } catch (err) {
    // res.status(422).send({ error: err.errors[0] });
    next(createHttpError(422, err.errors[0]));
  }
};
