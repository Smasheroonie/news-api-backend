const { getEndpoints } = require("../controllers/endpoints-controller");
const { articlesRouter } = require("./articles-router");
const { commentsRouter } = require("./comments-router");
const { topicsRouter } = require("./topics-router");
const { usersRouter } = require("./users-router");

apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.get("/", getEndpoints);

module.exports = { apiRouter };
