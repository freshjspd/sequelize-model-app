'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassRoom extends Model {
    static associate(models) {
      // + magic methods (lazy loading)
      ClassRoom.hasMany(models.Topic, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'classRoomId',
          allowNull: false,
        },
      });
      // classRoom1.getTopics();
      // classRoom1.countTopics()
      // ...
    }
  }
  ClassRoom.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ClassRoom',
      underscored: true,
    }
  );
  return ClassRoom;
};
