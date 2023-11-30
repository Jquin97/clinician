const express = require("express");
const router = express.Router();
const ScansController = require("../../controllers/scan_result");
const { authorizeMiddleware } = require("../../middlewares/auth_middleware");
const { upload } = require("../../middlewares/multer");

router
  .route("/:patientID")
  .get(authorizeMiddleware, ScansController.getScans)
  .post(
    authorizeMiddleware,
    upload.array("files"),
    ScansController.addPatientScans
  );
// .put(authorizeMiddleware, upload.single("file") ,ScansController.updateScans) Dont need to update the file as you can delete and new files

router
  .route("/entry/:id")
  .delete(authorizeMiddleware, ScansController.deleteScans);

module.exports = router;
