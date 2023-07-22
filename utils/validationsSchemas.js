const yup = require('yup');

const NAME_VALIDATION_SCHEMA = yup
  .string()
  .min(2)
  .max(64)
  .trim()
  .matches(
    /^[A-Z][a-z]+$/,
    'Name must start from capital letter and contain lower letter'
  )
  .required();

module.exports.USER_VALIDATION_SCHEMA = yup.object({
  firstName: NAME_VALIDATION_SCHEMA,
  lastName: NAME_VALIDATION_SCHEMA,
  email: yup.string().email().required(),
  passwordHash: yup
    .string()
    .min(8)
    .max(64)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .required(),
  birthday: yup.date().max(new Date()),
  gender: yup.mixed().oneOf(['male', 'female', 'other']),
});
