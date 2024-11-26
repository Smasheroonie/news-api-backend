const db = require('../db/connection');

exports.selectComments = (article_id) => {
    let queryStr = `
    SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`;

    return db.query(queryStr, [article_id]).then(({ rows }) => {
        const comments = rows;
        return comments;
    })
}