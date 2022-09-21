const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authCheck = async (req, res, next) => {
  const token = req.body?.accessToken;
  console.log(`Token: ${token}`);
  if (!token)
    return res
      .status(401)
      .send({ status: 401, payload: "Access token missing" });
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
    console.log(`Decoded: ${decoded}`);
    console.log(
      `Found user: ${foundUser?.userName} and decoded user: ${decoded?.userName}`
    );
    if (err || foundUser.userName !== decoded.userName) {
      console.log("Wrong user detected from token");
      console.log("Got here");
      return res
        .status(403)
        .send({ status: 403, payload: "Access token does not match user" });
    } else {
      req.body.user = foundUser;
      next();
    }
  });
};

module.exports = authCheck;
