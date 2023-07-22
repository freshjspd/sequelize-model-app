const { USER_VALIDATION_SCHEMA } = require('../utils/validationsSchemas');

module.exports.validateUser = async (req, res, next) => {
  try {
    const validatedUser = await USER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validatedUser;
    next();
  } catch (err) {
    res.status(422).send({ error: err.errors[0] });
  }
};
