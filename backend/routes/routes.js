const express = require("express");
const app = express();
const user = require("./user/user_route");
const auth = require("./authentication/auth_route");

app.use("/auth", auth);
app.use("/user", user);

module.exports = app;
