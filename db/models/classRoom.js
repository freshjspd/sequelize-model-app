'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassRoom extends Model {
    static associate(models) {
      ClassRoom.hasMany(models.Topic, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'classRoomId',
          allowNull: false,
        },
      });
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
