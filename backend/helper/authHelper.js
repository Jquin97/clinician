const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encryptPassword = async (Password) => {
  let promise = new Promise((res) => {
    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(Password, salt, function (err, hash) {
        res(hash);
      });
    });
  });
  return promise.then((res) => {
    return res;
  });
};

const tokenVerification = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  tokenVerification,
  encryptPassword,
};
