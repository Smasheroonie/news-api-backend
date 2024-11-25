const db = require("../db/connection");

exports.selectTopics = () => {
  let queryStr = `
    SELECT * FROM topics`;

  return db.query(queryStr).then(({ rows }) => {
    const topics = rows;
    return topics;
  });
};
