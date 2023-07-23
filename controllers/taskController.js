module.exports.createTask = (req, res) => {};

module.exports.getTasks = (req, res) => {};

module.exports.getTaskById = (req, res) => {
  res.status(200).send(req.params.taskId);
};

module.exports.updateTask = (req, res) => {};

module.exports.deleteTask = (req, res) => {};
