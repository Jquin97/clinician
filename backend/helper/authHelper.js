const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const encryptPassword = async (Password) => {
  let promise = new Promise((res, rej) => {
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

module.exports = {
  encryptPassword
};
