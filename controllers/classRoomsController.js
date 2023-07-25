const createHttpError = require('http-errors');
const { ClassRoom } = require('./../db/models');

module.exports.getClassRoomTopics = async (req, res, next) => {
  const { classroomId } = req.params;

  try {
    const foundClassRoom = await ClassRoom.findByPk(classroomId);

    if (!foundClassRoom) {
      return next(createHttpError(404, 'ClassRoom Not Found'));
    }

    const foundTopics = await foundClassRoom.getTopics({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).send(foundTopics);
  } catch (err) {
    next(err);
  }
};
