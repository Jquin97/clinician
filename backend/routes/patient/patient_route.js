const express = require("express");
const router = express.Router();
const PatientController = require("../../controllers/patient");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
router
  .route("/")
  .get(authorizeMiddleware, PatientController.getPatientLists)
  .post(authorizeMiddleware, PatientController.createPatient);
router
  .route("/search/:name")
  .get(authorizeMiddleware, PatientController.getPatientByName);
router
  .route("/:id")
  .get(authorizeMiddleware, PatientController.getPatientById)
  .put(authorizeMiddleware, PatientController.updatePatient)
  .delete(authorizeMiddleware, PatientController.deletePatient);

module.exports = router;
