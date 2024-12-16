const express = require("express");
const cors = require('cors');
const app = express();

const {
  handleServerError,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errors-controller");

const { apiRouter } = require("./routes/api-router");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePsqlErrors);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
