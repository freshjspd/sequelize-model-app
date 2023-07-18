'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString(),
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: { isIn: ['male', 'female', 'other'] },
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
