const express = require("express");
const router = express.Router();
const AppointmentController = require("../../controllers/appointment");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
router
  .route("/:patientID")
  .get(authorizeMiddleware, AppointmentController.getPatientAppointment)
  .post(authorizeMiddleware, AppointmentController.addPatientAppointment);
router
  .route("/entry/:id")
  .get(authorizeMiddleware, AppointmentController.getPatientAppointment)
  .put(authorizeMiddleware, AppointmentController.updatePatientAppointment)
  .delete(authorizeMiddleware, AppointmentController.deletePatientAppointment);

module.exports = router;
