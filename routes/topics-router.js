const { getTopics } = require("../controllers/topics-controller");

topicsRouter = require("express").Router();

topicsRouter.get("/", getTopics);

module.exports = { topicsRouter };
