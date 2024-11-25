const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const { handleServerError } = require("./controllers/errors-controller");
const { getTopics } = require("./controllers/topics-controller");

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
});

app.get("/api/topics", getTopics);

app.use(handleServerError);

module.exports = app;
