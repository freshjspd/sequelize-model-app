const _ = require('lodash');
const { User } = require('./../models');

module.exports.createUser = async (req, res) => {
  const { body } = req;

  // захешировать пароль
  // теперь не нужно, отработает сеттер

  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      return res.status(500).send('Server Error');
    }

    const preparedUser = _.omit(createdUser.get(), [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send(preparedUser);
  } catch (err) {
    console.log(' controller err :>> ', err);
    res.status(500).send('Server Error');
  }
};

module.exports.getUsers = async (req, res) => {
  const { pagination } = req;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
      order: ['id'],
      // limit: pagination.limit,
      // offset: pagination.offset,
      ...pagination,
    });

    res.status(200).send(foundUsers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUser) {
      return res.status(404).send('User Not Found');
    }

    res.status(200).send(foundUser);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.updateUserById = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    // если пришел пароль, то его захешировать
    // теперь не нужно, отработает сеттер

    const [, [updatedUser]] = await User.update(body, {
      raw: true,
      where: { id: userId },
      returning: true,
    });

    if (!updatedUser) {
      return res.status(404).send('User Not Found');
    }

    const preparedUser = _.omit(updatedUser, [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send(preparedUser);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUserCount = await User.destroy({
      where: { id: userId },
    });

    if (!deletedUserCount) {
      return res.status(404).send('User Not Found');
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).send('Server Errod');
  }
};
