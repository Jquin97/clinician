const express = require("express");
const router = express.Router();
const MedicationController = require("../../controllers/medication");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
router
  .route("/:patientID")
  .get(authorizeMiddleware, MedicationController.getPatientResults)
  .post(authorizeMiddleware, MedicationController.addPatientResults);
router
  .route("/:id")
  .put(authorizeMiddleware, MedicationController.updatePatientResults)
  .delete(authorizeMiddleware, MedicationController.deletePatientResults);

module.exports = router;
