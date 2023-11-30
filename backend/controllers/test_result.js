const { TestResult } = require("../models");

const getPatientResults = async (req, res) => {
  const id = req.params.patientID;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const results = await TestResult.findAll({
      where: {
        PatientId: id,
      },
    });
    if (results.length > 0) {
      res.send({
        success: true,
        results,
        message: "Patient Results received successfully.",
      });
    } else {
      res.send({
        success: false,
        message: "No results found.",
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

const getPatientResult = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "ID not found",
      });
    }
    const result = await TestResult.findOne({
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

const updatePatientResult = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const updateTestResult = await TestResult.update(req.body, {
      where: {
        id,
      },
    });

    const updatePatientResult = await TestResult.findOne({
      where: {
        id,
      },
    });
    if (updatePatientResult) {
      res.send({
        success: true,
        data: updateTestResult,
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

const deletePatientResults = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }

    const deleteTestResult = await TestResult.destroy({
      where: {
        id,
      },
    });
    if (!deleteTestResult) {
      return res.send({
        success: false,
        message: "Unable to be delete test result.",
      });
    }
    return res.send({
      success: true,
      data: null,
      message: "Test result deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Unable to delete test results.",
    });
  }
};

const addPatientResults = async (req, res) => {
  try {
    const patientID = req.params.patientID;
    if (!patientID) {
      return res.send({
        success: false,
        message: "Patient ID not found",
      });
    }
    const { type, note } = req.body;
    if (!type || !note) {
      return res.send({
        success: false,
        message: "Missing required fields",
      });
    }
    req.body.PatientId = patientID;
    const addTestResult = await TestResult.create(req.body);
    res.send({
      success: true,
      data: addTestResult,
      message: "Test result added successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
      message: "Unable to create patient test result.",
    });
  }
};

module.exports = {
  getPatientResults,
  getPatientResult,
  addPatientResults,
  updatePatientResult,
  deletePatientResults,
};
