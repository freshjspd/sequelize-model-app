const yup = require('yup');

const NAME_VALIDATION_SCHEMA = yup
  .string()
  .min(2)
  .max(64)
  .trim()
  .matches(
    /^[A-Z][a-z]+$/,
    'Name must start from capital letter and contain lower letter'
  );

const EMAIL_VALIDATION_SCHEMA = yup.string().email();

const PASSWORD_HASH_VALIDATION_SCHEMA = yup
  .string()
  .min(8)
  .max(64)
  .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);

const BIRTHDAY_VALIDATION_SCHEMA = yup.date().max(new Date());

const GENDER_VALIDATION_SCHEMA = yup
  .string()
  .oneOf(['male', 'female', 'other']);

module.exports.NEW_USER_VALIDATION_SCHEMA = yup.object({
  firstName: NAME_VALIDATION_SCHEMA.required(),
  lastName: NAME_VALIDATION_SCHEMA.required(),
  email: EMAIL_VALIDATION_SCHEMA.required(),
  passwordHash: PASSWORD_HASH_VALIDATION_SCHEMA.required(),
  birthday: BIRTHDAY_VALIDATION_SCHEMA,
  gender: GENDER_VALIDATION_SCHEMA,
});

module.exports.UPDATED_USER_VALIDATION_SCHEMA = yup.object({
  firstName: NAME_VALIDATION_SCHEMA,
  lastName: NAME_VALIDATION_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  passwordHash: PASSWORD_HASH_VALIDATION_SCHEMA,
  birthday: BIRTHDAY_VALIDATION_SCHEMA,
  gender: GENDER_VALIDATION_SCHEMA,
});
