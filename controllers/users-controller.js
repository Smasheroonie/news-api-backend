const { checkRowExists } = require("../models/checker-model");
const { selectUsers, selectUserByUsername } = require("../models/users-model");

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  const promises = [
    checkRowExists("users", "username", username),
    selectUserByUsername(username),
  ];

  Promise.all(promises)
    .then(([_, user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
