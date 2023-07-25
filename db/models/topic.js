'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.ClassRoom, {
        foreignKey: 'classRoomId',
      });
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
