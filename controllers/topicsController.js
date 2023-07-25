const createHttpError = require('http-errors');
const { Topic, ClassRoom } = require('./../db/models');

module.exports.getTopicById = async (req, res, next) => {
  const { topicId } = req.params;

  try {
    const foundTopic = await Topic.findByPk(topicId, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt', 'classRoomId'] },
      include: {
        model: ClassRoom,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });

    if (!foundTopic) {
      return next(createHttpError(404, 'Topic Not Found'));
    }

    res.status(200).send(foundTopic);
  } catch (err) {
    next(err);
  }
};
