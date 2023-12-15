const express = require("express");
const app = express();
const user = require("./user/user_route");
const auth = require("./authentication/auth_route");
const patient = require("./patient/patient_route");
const patientResults = require("./test_result/test_result");
const patientMedication = require("./medication/medication");
const patientAppointment = require("./appointment/appointment");
const scans = require("./scan_result/scan_result");

app.use("/auth", auth);
app.use("/user", user);
app.use("/patient", patient);
app.use("/scans", scans);
app.use("/test", patientResults);
app.use("/medication", patientMedication);
app.use("/appointment", patientAppointment);

module.exports = app;
