const { Appointment } = require("../models");

const getPatientAppointments = async (req, res) => {
  const id = req.params.patientID;
  if (!id) {
    return res.send({
      success: false,
      message: "Patient ID not found",
    });
  }
  const appointments = await Appointment.findAll({
    where: {
      PatientId: id,
    },
  });
  if (appointments?.length <= 0) {
    res.send({
      success: false,
      message: "No results found.",
    });
  }
  res.send({
    success: true,
    data: appointments,
  });
};
const getPatientAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "ID not found",
      });
    }
    const result = await Appointment.findOne({
      where: {
        id,
      },
    });
    if (result) {
      res.send({
        success: true,
        data: result,
      });
    } else {
      res.send({
        success: false,
        message: "No test result found for the id",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to find test results.",
    });
  }
};
const updatePatientAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const updateAppointment = await Appointment.update(req.body, {
      where: {
        id,
      },
    });

    const updatePatientAppointment = await Appointment.findOne({
      where: {
        id,
      },
    });
    if (updatePatientAppointment) {
      res.send({
        success: true,
        data: updateAppointment,
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
const deletePatientAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const deleteAppointment = await Appointment.destroy({
      where: {
        id,
      },
    });
    if (!deleteAppointment) {
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
const addPatientAppointment = async (req, res) => {
  try {
    const patientID = req.params.patientID;
    if (!patientID) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const { treatment } = req.body;
    if (!treatment) {
      return res.send({
        success: false,
        message: "Missing required fields",
      });
    }
    req.body.PatientId = patientID;
    const addAppointment = await Appointment.create(req.body);
    res.send({
      success: true,
      data: addAppointment,
      message: "Appointment added successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
      message: "Unable to create patient appointment.",
    });
  }
};

module.exports = {
  getPatientAppointments,
  getPatientAppointment,
  updatePatientAppointment,
  deletePatientAppointment,
  addPatientAppointment,
};
