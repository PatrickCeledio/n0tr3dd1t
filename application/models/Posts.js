// Set-up components
var db = require("../config/database");
// Set up PostModel object
const PostModel = {};

// Creating a new post
PostModel.create = (title, description, photoPath, thumbnail, fk_userId) => {
    let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);';
    return db.execute(baseSQL, [
        title, 
        description, 
        photoPath, 
        thumbnail, 
        fk_userId,
    ])
    .then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

// Search functionality
PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, DESCRIPTION, thumbnail, concat_ws(' ', title, description) AS haystack \
        FROM posts \
        HAVING haystack like ?;"

        let sqlReadySearchTerm = "%" + searchTerm + "%";
        return db.execute(baseSQL, [sqlReadySearchTerm])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

// Returns given number of posts 
PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL = "SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT ?";
    return db.execute(baseSQL, [numberOfPost]).then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => {
    // Command that returns the specific post and its details
    let baseSQL = 'SELECT u.id, u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id=fk_userid where p.id=?;';

    return db
        .execute(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err))
};

module.exports = PostModel;
