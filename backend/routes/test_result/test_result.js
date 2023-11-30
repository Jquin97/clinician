const express = require("express");
const router = express.Router();
const TestResultController = require("../../controllers/test_result");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
router
  .route("/:patientID")
  .get(authorizeMiddleware, TestResultController.getPatientResults)
  .post(authorizeMiddleware, TestResultController.addPatientResults);
router
  .route("/:id")
  .put(authorizeMiddleware, TestResultController.updatePatientResults)
  .delete(authorizeMiddleware, TestResultController.deletePatientResults);

module.exports = router;
