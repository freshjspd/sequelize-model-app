const { Router } = require('express');
const { topicsController } = require('../controllers');

// '/api/topics'
const topicsRouter = Router();

topicsRouter.get('/:topicId', topicsController.getTopicById);

module.exports = topicsRouter;
