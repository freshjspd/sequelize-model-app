const { Router } = require('express');
const usersRouter = require('./usersRouter');
const tasksRouter = require('./tasksRouter');
const classRoomsRouter = require('./classRoomsRouter');
const topicsRouter = require('./topicsRouter');

const appRouter = Router();

appRouter.use('/users', usersRouter);
appRouter.use('/tasks', tasksRouter);

appRouter.use('/classrooms', classRoomsRouter);
appRouter.use('/topics', topicsRouter);

// get /api/classrooms/:classroomId/topics
// get /api/topics/:topicId

module.exports = appRouter;
