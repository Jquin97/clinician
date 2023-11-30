const { Scans } = require("../models");
const path = require("path");

const getScans = async (req, res) => {
  const id = req.params.patientID;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const results = await Scans.findAll({
      where: {
        PatientId: id,
      },
    });
    if (results.length > 0) {
      res.send({
        success: true,
        results,
        message: "Patient Scans received successfully.",
      });
    } else {
      res.send({
        success: true,
        message: "No scans found.",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to find scans results.",
    });
  }
};

const updateScans = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const updateScans = await Scans.update(
      {
        attachments: req.body.data.scans,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updateScans[0] === 1) {
      res.send({
        success: true,
        updateScans,
        message: "Patient Scans updated successfully.",
      });
    } else {
      res.send({
        success: false,
        message: "No scans updated.",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to update scans.",
    });
  }
};

const deleteScans = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const deleteScans = await Scans.destroy({
      where: {
        id,
      },
    });
    if (!deleteScans) {
      return res.send({
        success: false,
        message: "Unable to be delete scans.",
      });
    }
    return res.send({
      success: true,
      data: null,
      message: "Scans deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to delete scans.",
    });
  }
};

const addPatientScans = async (req, res) => {
  try {
    const patientID = req.params.patientID;
    if (!patientID) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const scans = req.files;
    if (!scans || scans.length < 1) {
      return res.send({
        success: false,
        message: "Missing Scan Path",
      });
    }
    scans.forEach(async (el) => {
      const scanPath = path.join(__dirname, "../" + el.path);
      try {
        await Scans.create({
          attachments: scanPath,
          PatientId: patientID,
        });
      } catch (error) {
        return res.send({
          success: false,
          message: "Exception, unable to add scans",
        });
      }
    });
    res.send({
      success: true,
      message: "Scans added successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
      message: "Unable to create patient scans result.",
    });
  }
};

module.exports = {
  getScans,
  deleteScans,
  updateScans,
  addPatientScans,
};
