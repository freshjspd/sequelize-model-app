module.exports.createUser = async (req, res) => {};

module.exports.getUsers = async (req, res) => {};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  res.status(200).send('OK');
};

module.exports.updateUserById = async (req, res) => {};

module.exports.deleteUserById = async (req, res) => {};

// {
//   createUser: ()=>{}
//   getUsers: ()=>{}
//   ...
// }
