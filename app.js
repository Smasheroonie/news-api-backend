const express = require("express");
const app = express();

const {
  handleServerError,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errors-controller");

const { apiRouter } = require("./routes/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePsqlErrors);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
