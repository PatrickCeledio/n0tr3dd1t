var db = require("../config/database");
const CommentModel = {};

CommentModel.create = (userId, postId, comment) => {
    // SQL statement to insert comments
    let baseSQL = `INSERT INTO comments (comment, fk_postid, fk_authorid) VALUES (?,?,?);`
    return db.query(baseSQL, [comment, postId, userId])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                // Return id of newly created row of comments table
                return Promise.resolve(results.insertId);
            } else {
                // Return negative value for failure
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

CommentModel.getCommentsForPost = (postId) => {
    // Match user id with fk_authorid reference 
    // Lists comments by descending order
    let baseSQL = `SELECT u.username, c.comment, c.created, c.id 
                    FROM comments c
                    JOIN users u on u.id=fk_authorid
                    WHERE c.fk_postid=?
                    ORDER BY c.created DESC`;
    
    return db.query(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        }).catch(err => Promise.reject(err));
}

module.exports = CommentModel;
