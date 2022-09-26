const adminCheck = (req, res, next) => {
  if (req.body.user.roles.includes(["Admin"])) {
    next();
  } else {
    res.status(401).send({ status: 401, payload: "User is not an admin" });
  }
};

module.exports = adminCheck;
