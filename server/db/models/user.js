'use strict';
const { hashSync } = require('bcrypt');
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
      // {passwordHash: qwerty}
      // при выполнении методов User.create(), User.update()
      //   автоматом будет віполнен сеттер
      // Т.е. в бузу пойдет уже преобразованное значение
      //   {passwordHash: 5d4f5sd-sdf4sd5f-231fsd}
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('passwordHash', hashSync(value, 10));
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
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
