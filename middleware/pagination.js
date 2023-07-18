module.exports.paginateUser = (req, res, next) => {
  const { page = 1, results = 10 } = req.query;

  req.pagination = {
    limit: results,
    offset: (page - 1) * results,
  };

  next();
};
