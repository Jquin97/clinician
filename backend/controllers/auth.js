var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const checkExistingUser = async (email) => {
  const existingUser = await User.findAll({
    where: {
      email,
    },
  });
  if (existingUser.length > 0) {
    return existingUser;
  }
  return false;
};

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const existingUser = await checkExistingUser(email);
    if (existingUser) {
      //password verification
      const isValidPassword = bcrypt.compareSync(
        password,
        existingUser[0].password
      );

      if (isValidPassword ) {
        var token = generateToken({
          email,
          id: existingUser[0].id,
        }); //sign token using email
        const data = {
          token,
          email,
          id: existingUser[0].id,
        };
        res.send({
          success: true,
          message: "Login successful!",
          data,
        });
      } else {
        res.send({
          success: false,
          message: "Invalid password!",
        });
      }
    } else {
      res.send({
        success: false,
        message: "User not found",
        data,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: "Error Reading request",
    });
    console.error(err);
  }
};


module.exports = {
    login,
  };
  