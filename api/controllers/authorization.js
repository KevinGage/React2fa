const authorize = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send();
  }
  next();
};

module.exports = authorize