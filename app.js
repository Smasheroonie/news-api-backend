const express = require("express");
const app = express();

const { getEndpoints } = require("./controllers/endpoints-controller");
const { getTopics } = require("./controllers/topics-controller");
const {
  handleServerError,
  handleBadRequest,
} = require("./controllers/errors-controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles-controller");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use(handleBadRequest);

app.use(handleServerError);

module.exports = app;
