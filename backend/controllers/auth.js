var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const nodemailer = require("nodemailer");
const authHelper = require("../helper/authHelper");

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

      if (isValidPassword) {
        var token = generateToken({
          email,
          id: existingUser[0].id,
        }); //sign token using email
        const data = {
          token,
          email,
          firstName: existingUser[0].firstName,
          lastName: existingUser[0].lastName,
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body.data;
    const existingUser = await checkExistingUser(email);
    if (!existingUser) {
      res.send({
        success: false,
        message: "Email does not exist!",
      });
      return;
    }
    const user = existingUser[0];
    const verification_token = generateToken(email);
    if (!user) {
      res.send({
        message: "user not found",
      });
      return;
    }

    const mailOptions = {
      from: process.env.CLINICIAN_EMAIL,
      to: email,
      subject: "Reset password for clinician app",
      html: `<p>Update Password!<br>
                        <a href="${process.env.CLIENT_URL}resetPassword/${verification_token}">
                        Please click this link to verify your email.</a></p>`,
    };

    try {
      await sendVerificationEmail(mailOptions);
      res.send({
        success: true,
        message: `Email sent to ${email}`,
      });
    } catch (sendEmailError) {
      console.log(sendEmailError);
      res.send({
        success: false,
        message: `Unable to send email to ${email}`,
        error: sendEmailError,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Unhandled Error Occurred!",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = req.user;
    const _user = await User.findOne({
      where: {
        email,
      },
    });
    if (_user) {
      await _user
        .update({
          password: await authHelper.encryptPassword(req.body.data.password),
        })
        .then(() => {
          res.send({
            success: true,
            messagee: "Password update successfully!",
          });
        });
    }else{
      res.send({
        success: false,
        messagee: "User not found!",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Password update failed",
      error,
    });
  }
};

const sendVerificationEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.CLINICIAN_EMAIL,
      pass: process.env.CLINICIAN_PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const verifyToken = async (req, res) => {
  try {
    const email = await authHelper.tokenVerification(
      req.headers["authorization"]
    );
    if (email) {
      await User.findOne({
        where: {
          email,
        },
      });
      res.send({
        success: true,
        message: `${email} is verified for this step.`,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Inavlid token",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Unhandled Error Occurred!",
      error,
    });
  }
};

module.exports = {
  login,
  verifyToken,
  forgotPassword,
  resetPassword,
};
