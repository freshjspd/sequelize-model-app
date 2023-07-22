const { Router } = require('express');
const { usersController } = require('./../controllers');
const { paginate, validate } = require('./../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .post(validate.validateUserOnCreate, usersController.createUser)
  .get(paginate.paginateUser, usersController.getUsers);

usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(validate.validateUserOnUpdate, usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
