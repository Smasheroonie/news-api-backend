const db = require("../db/connection");
const format = require("pg-format");

exports.checkRowExists = (table, column, row) => {
  const sql = format(`SELECT * FROM %I WHERE %I = %L`, table, column, row);

  return db.query(sql).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({
        status: 404,
        msg: `Not found`,
      });
    }
  });
};
