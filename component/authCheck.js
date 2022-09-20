const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authCheck = async (req, res, next) => {
  const token = req.body?.accessToken;
  if (!token)
    return res
      .status(401)
      .send({ status: 401, payload: "Access token missing" });
  console.log(`Access token received: ${token}`);
  const userName = req.body?.userName;
  const foundUser = await User.findOne({ userName: userName }).exec();
  //Forbidden
  if (!foundUser)
    return res
      .status(401)
      .send({ status: 401, payload: "Missing username verification" });
  console.log(foundUser);

  // evaluate jwt
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.username) {
      console.log("Wrong user detected from token");
      console.log(
        `Found user: ${foundUser.userName} and decoded user: ${decoded.username}`
      );
      return res
        .status(403)
        .send({ status: 403, payload: "Access token does not match user" });
    }

    next();
  });
};

module.exports = authCheck;
