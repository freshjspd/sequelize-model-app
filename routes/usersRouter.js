const { Router } = require('express');
const { usersController } = require('./../controllers');

const usersRouter = Router();

usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(usersController.getUsers);

// /api/users/10
usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
