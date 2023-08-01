const _ = require('lodash');
const { Task } = require('./../db/models');

module.exports.createTask = async (req, res) => {
  const { body } = req;

  try {
    const createTask = await Task.create(body);

    if (!createTask) {
      return res.status(500).send('Server Error');
    }

    const preparedTask = _.omit(createTask.get(), ['updatedAt']);
    res.status(201).send(preparedTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      attributes: { exclude: ['updatedAt'] },
    });

    res.status(200).send(foundTasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const foundTask = await Task.findByPk(taskId, {
      raw: true,
      attributes: { exclude: ['updatedAt'] },
    });

    if (!foundTask) {
      return res.status(404).send('Task Not Found');
    }

    res.status(200).send(foundTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.updateTask = async (req, res) => {
  const {
    body,
    params: { taskId },
  } = req;

  try {
    const [, [updatedTask]] = await Task.update(body, {
      where: { id: taskId },
      raw: true,
      attributes: { exclude: ['updatedAt'] },
      returning: true,
    });

    if (!updatedTask) {
      return res.status(404).send('Task Not Found');
    }

    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTaskCount = await Task.destroy({
      where: { id: taskId },
    });

    if (!deletedTaskCount) {
      return res.status(404).send('Task Not Found');
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
