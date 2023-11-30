const { Medication } = require("../models");

const getPatientMedications = async (req, res) => {
  const id = req.params.patientID;
  if (!id) {
    return res.send({
      success: false,
      message: "Patient ID not found",
    });
  }
  const medications = await Medication.findAll({
    where: {
      PatientId: id,
    },
  });
  if (medications?.length <= 0) {
    res.send({
      success: false,
      message: "No results found.",
    });
  }
  res.send({
    success: true,
    data: medications,
  });
};

const updatePatientMedication = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const updateMedication = await Medication.update(
      {
        ...req.body.data,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatePatientMedication = await Medication.findOne({
      where: {
        id,
      },
    });
    if (updatePatientMedication) {
      res.send({
        success: true,
        updateMedication,
        message: "Patient Results updated successfully.",
      });
    } else {
      res.send({
        success: false,
        message: "No results updated.",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to update test results.",
    });
  }
};

const deletePatientMedication = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const deleteMedication = await Medication.destroy({
      where: {
        id,
      },
    });
    if (!deleteMedication) {
      return res.send({
        success: false,
        message: "Unable to be delete medications.",
      });
    }
    return res.send({
      success: true,
      data: null,
      message: "Medication deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to delete medications.",
    });
  }
};

const addPatientMedication = async (req, res) => {
  try {
    const patientID = req.params.patientID;
    if (!patientID) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const { type, note } = req.body.data;
    if (!type || !note) {
      return res.send({
        success: false,
        message: "Missing required fields",
      });
    }
    req.body.data.PatientId = patientID;
    const addMedication = await Medication.create(req.body.data);
    res.send({
      success: true,
      data: addMedication,
      message: "Medication added successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
      message: "Unable to create patient medication.",
    });
  }
};

module.exports = {
  getPatientMedications,
  updatePatientMedication,
  deletePatientMedication,
  addPatientMedication,
};
