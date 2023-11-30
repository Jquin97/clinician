const { Patient, EmergencyContact } = require("../models");
const { Op } = require("sequelize");

const getPatientLists = async (req, res) => {
  const patients = await Patient.findAll();
  if (patients?.length <= 0) {
    res.send({
      success: false,
      message: "Patients not found",
    });
  }
  res.send({
    success: true,
    data: patients,
  });
};

const getPatientById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.send({
      success: false,
      message: "Patient ID not found",
    });
  }
  const checkEistingPatient = await Patient.findOne({
    include: { model: EmergencyContact },
    where: {
      id,
    },
  });
  if (!checkEistingPatient) {
    return res.send({
      success: false,
      message: "Patient not found By Id",
    });
  }
  return res.send({
    success: true,
    data: checkEistingPatient,
  });
};

const createPatient = async (req, res) => {
  try {
    const { firstName, email, lastName } = req.body;
    if (!firstName || !email || !lastName) {
      return res.send({
        success: false,
        message: "All required fields",
      });
    }
    const createdPatient = await Patient.create(req.body);
    res.send({
      success: true,
      data: createdPatient,
    });
  } catch (err) {
    return res.send({
      success: false,
      error: err,
      message: "Unable to create patient",
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const updatePatient = await Patient.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    const updatePatientFound = await Patient.findOne({
      where: {
        id,
      },
    });
    if (!updatePatient) {
      return res.send({
        success: false,
        message: "Patient unable to be update",
      });
    }
    if (req.body.emergencyContact) {
      const updatedEmergencyContact = await EmergencyContact.update(
        {
          ...req.body.emergencyContact,
        },
        {
          where: {
            id: req.body.emergencyContact.id,
          },
        }
      );
      if (!updatedEmergencyContact) {
        return res.send({
          success: false,
          message: "Emergency Contact unable to be update",
        });
      }
    }

    return res.send({
      success: true,
      data: updatePatientFound,
    });
  } catch (err) {
    return res.send({
      success: false,
      error: err,
      message: "Unable to create patient",
    });
  }
};

const deletePatient = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.send({
      success: false,
      message: "Patient ID not found",
    });
  }
  const deletePatient = await Patient.destroy({
    where: {
      id,
    },
  });
  if (!deletePatient) {
    return res.send({
      success: false,
      message: "Patient unable to be delete",
    });
  }
  return res.send({
    success: true,
    data: null,
    message: "Patient deleted",
  });
};

const getPatientByName = async (req, res) => {
  let name = req.params.name;
  if (!name) {
    return res.send({
      success: false,
      patients:[],
      message: "Patient not found",
    });
  }
  const checkEistingPatient = await Patient.findAll({
    where: {
      firstName: {
        [Op.iLike]: name+'%'
      }
    },
    attributes: ['id', 'firstName', 'lastName'],
    limit:10,
  });
  if (!checkEistingPatient) {
    return res.send({
      success: false,
      patients:[],
      message: "Patient not found By Id",
    });
  }
  return res.send({
    success: true,
    patients: checkEistingPatient,
  });
};


getPatientByName

module.exports = {
  getPatientLists,
  getPatientByName,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
