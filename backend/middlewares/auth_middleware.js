const authHelper = require("../helper/authHelper");

const authorizeMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) {
    res.status(403).send({
      success: false,
      message: "Login required!",
    });
    return;
  }

  const user = await authHelper.tokenVerification(token);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Inavlid token",
    });
  }
};

module.exports = {
  authorizeMiddleware,
};
