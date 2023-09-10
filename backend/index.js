const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const version = process.env.VERSION;
const PORT = process.env.PORT || 5002;

const { sequelize } = require("./models");
const routes = require("./routes/routes");

// MIDDELWARES
app.use(helmet());
const limiter = ratelimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request, Please try again later.",
});
app.use("/api", limiter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (_, res) => {
  res.send(
    `Welcome to Devops Project!  Version: ${version}, Environment: ${process.env.NODE_ENV}, Database: ${process.env.DB_DATABASE}`
  );
});
app.use(`/api/${version}`, routes);

// ERROR HANDLING FOR 404 ROUTE
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Cannot found any route",
  });
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

app.listen(PORT, async () => {
  try {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    await sequelize.authenticate();
    console.log(`Connection has been established successfully. ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
