const _ = require('lodash');
const { User } = require('./../models');

// User.create();
// User.findAll();
// User.findByPk();
// User.update();
// User.destroy();

module.exports.createUser = async (req, res) => {
  // достать боди
  const { body } = req;

  // захешировать пароль

  try {
    // попробовать создать
    const createdUser = await User.create(body);

    if (!createdUser) {
      return res.status(500).send('Server Error');
    }

    const preparedUser = _.omit(createdUser.get(), [
      'passwordHash',
      'createdAt',
      'updatedAt',
    ]);

    // если создался -> выпилить лишнюю инфу (created/updatedAt, passwordHash), 201 боди

    res.status(201).send(preparedUser);
  } catch (err) {
    // иначе ошибка
    res.status(500).send('Server Error');
  }
};

module.exports.getUsers = async (req, res) => {
  // получить всех пользователей (по критерию)
  try {
    // отправить результат
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
    });

    res.status(200).send(foundUsers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.getUserById = async (req, res) => {
  // получить id пользователя
  const { userId } = req.params;

  try {
    // искать пользователя с id
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] },
    });

    // если не найден, то 404 User Not Found
    if (!foundUser) {
      return res.status(404).send('User Not Found');
    }

    // иначе 200 user
    res.status(200).send(foundUser);
  } catch (err) {
    // если ошибка - 500 Server Error
    res.status(500).send('Server Error');
  }
};

module.exports.updateUserById = async (req, res) => {
  // достать что менять и как менять
  const {
    body,
    params: { userId },
  } = req;

  // 1 найти пользователя - findByPk     - неоптимально, максимум 2 обращения к базе
  //   если он есть, то изменить - update

  // 2 попробовать найти и обновить - update ({where}) - оптимальнее, максимум 1 обращение к базе

  try {
    // если пришел пароль, то его захешировать
    // updatedUserInfo[1][0]
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
