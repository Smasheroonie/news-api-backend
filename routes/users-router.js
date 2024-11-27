const { getUsers } = require("../controllers/users-controller");

usersRouter = require("express").Router();

usersRouter.get("/", getUsers);

module.exports = { usersRouter };
