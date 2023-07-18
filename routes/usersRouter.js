const { Router } = require('express');
const { usersController } = require('./../controllers');
const { paginate } = require('./../middleware');

const usersRouter = Router();

// get /api/users?page=1&results=2
// limit = results
// offset = (page - 1) * results

usersRouter
  .route('/')
  .post(usersController.createUser)
  .get(paginate.paginateUser, usersController.getUsers);

// /api/users/10
usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
