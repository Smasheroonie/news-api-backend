const db = require("../db/connection");

exports.selectUsers = () => {
  const queryStr = `SELECT * FROM users`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByUsername = (username) => {
  const queryStr = `
  SELECT username,
  name,
  avatar_url
  FROM users WHERE username = $1`;

  return db.query(queryStr, [username]).then(({ rows }) => {
    return rows[0];
  });
};
