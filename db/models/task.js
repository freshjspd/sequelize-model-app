'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {}
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: /^\s+$/,
          len: [4, 500],
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString(),
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      underscored: true,
    }
  );
  return Task;
};
