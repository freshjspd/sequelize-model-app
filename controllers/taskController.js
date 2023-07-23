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
    console.log('err :>> ', err);
    res.status(500).send('Server Error');
  }
};

module.exports.getTasks = async (req, res) => {};

module.exports.getTaskById = async (req, res) => {
  res.status(200).send(req.params.taskId);
};

module.exports.updateTask = async (req, res) => {};

module.exports.deleteTask = async (req, res) => {};
