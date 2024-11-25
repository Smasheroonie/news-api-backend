const { selectTopics } = require("../models/topics-model");

getTopics = (req, res) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

module.exports = { getTopics };
