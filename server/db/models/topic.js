'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      // + magic methods (lazy loading)
      Topic.belongsTo(models.ClassRoom, {
        foreignKey: 'classRoomId',
      });
      // topic1.getClassRoom()
      // topic1.setClassRoom()
      // topic1.createClassRoom()
    }
  }
  Topic.init(
    {
      caption: DataTypes.STRING,
      // id
      // createdAt
      // updatedAt
      // ClassRoomId -> classRoomId
    },
    {
      sequelize,
      modelName: 'Topic',
      underscored: true,
    }
  );
  return Topic;
};
