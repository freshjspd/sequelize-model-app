const { Router } = require('express');
const { classRoomsController } = require('../controllers');

const classRoomsRouter = Router();

// '/api/classRooms'

classRoomsRouter.get(
  '/:classroomId/topics',
  classRoomsController.getClassRoomTopics
);

module.exports = classRoomsRouter;
