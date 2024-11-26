const express = require("express");
const app = express();

const { getEndpoints } = require("./controllers/endpoints-controller");
const { getTopics } = require("./controllers/topics-controller");
const {
  handleServerError,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errors-controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articles-controller");
const {
  getComments,
  addComment,
} = require("./controllers/comments-controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", addComment);

app.use(handlePsqlErrors);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;
