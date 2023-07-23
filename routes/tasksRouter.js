const { Router } = require('express');
const { tasksController } = require('../controllers');

const tasksRouter = Router();

// '/api/tasks'
tasksRouter
  .route('/')
  .post(tasksController.createTask)
  .get(tasksController.getTasks);

// '/api/tasks/5'
tasksRouter
  .route('/:taskId')
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);

module.exports = tasksRouter;
