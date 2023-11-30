const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth_middleware");
const authController = require("../../controllers/auth");

router.post("/", authController.login);
router.put("/forgotPassword", authController.forgotPassword);
router.put(
  "/resetPassword",
  authMiddleware.authorizeMiddleware,
  authController.resetPassword
);
router.get(
  "/verifyToken",
  authMiddleware.authorizeMiddleware,
  authController.verifyToken
);

module.exports = router;
