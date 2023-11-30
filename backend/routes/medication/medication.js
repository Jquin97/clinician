const express = require("express");
const router = express.Router();
const MedicationController = require("../../controllers/medication");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
router
  .route("/:patientID")
  .get(authorizeMiddleware, MedicationController.getPatientMedications)
  .post(authorizeMiddleware, MedicationController.addPatientMedication);
router
  .route("/entry/:id")
  .get(authorizeMiddleware, MedicationController.getPatientMedication)
  .put(authorizeMiddleware, MedicationController.updatePatientMedication)
  .delete(authorizeMiddleware, MedicationController.deletePatientMedication);

module.exports = router;
