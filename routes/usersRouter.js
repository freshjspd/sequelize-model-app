const { Router } = require('express');
const yup = require('yup');
const { usersController } = require('./../controllers');
const { paginate } = require('./../middleware');

const usersRouter = Router();

// get /api/users?page=1&results=2
// limit = results
// offset = (page - 1) * results

// /METHOD path - endpoint
const userValidation = async (req, res, next) => {
  const USER_VALIDATION_SCHEMA = yup.object({
    firstName: yup
      .string()
      .min(2)
      .max(64)
      .matches(
        /^[A-Z][a-z]+$/,
        'Name must start from capital letter and contain lower letter'
      )
      .required(),
    lastName: yup
      .string()
      .min(2)
      .max(64)
      .matches(
        /^[A-Z][a-z]+$/,
        'Name must start from capital letter and contain lower letter'
      )
      .required(),
    email: yup.string().email().required(),
    passwordHash: yup
      .string()
      .min(8)
      .max(64)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
      .required(),
    birthday: yup.date().max(new Date()),
    gender: yup.mixed().oneOf(['male', 'female', 'other']),
  });

  try {
    const validatedUser = await USER_VALIDATION_SCHEMA.validate(req.body);
    console.log('validatedUser :>> ', validatedUser);
  } catch (err) {
    console.log('err :>> ', err);
  }

  next();
};

usersRouter
  .route('/')
  .post(userValidation, usersController.createUser)
  .get(paginate.paginateUser, usersController.getUsers);

// /api/users/10
usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
