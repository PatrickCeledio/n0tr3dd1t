// Models are used for interacting with the database

// Set up bcrypt
var bcrypt = require('bcrypt');

// Set up database
var db = require("../config/database");

// Set up UserModel empty object
const UserModel = {};

// Creating users
UserModel.create = (username, password, email) => {
    // Hash password using bcrypt for 15 rounds (~3 seconds/hash)
    return bcrypt.hash(password, 15)
    .then((hashedPassword) => {
        let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());";
        return db.execute(baseSQL, [username, email, hashedPassword])
    })
    .then(([results, fields]) => {
        // If user was created
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId);
        }else{
            // If no row was inserted, (-1) means user was not created
            return Promise.resolve(-1);
        }
    })
    // Catch block for errors
    .catch((err) => Promise.reject(err));
};

// Verify if username exists in database
UserModel.usernameExists = (username) => {
    // We must return this since this is a promise: (satisfied, fulfilled, rejected)
    return db.execute("SELECT * FROM users WHERE username=?", [username])

    // If username exists, return promise
    .then(([results, fields]) => {
        
        // results && results.length refer to the rows 
        // This return function is for the return db.execute() function
        // We negate the return value in correspondance of doing the error cases first
        return Promise.resolve(!(results && results.length == 0));
    })
    // Catch promise error
    // No return keyword and curly braces are needed as the arrow is returning a single-line statement, 
    .catch((err) => Promise.reject(err));
};

// Verify if email exists in database 
// This promise chain is similar in structure to the usernameExists function
UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM users WHERE email=?", [email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

// Verify username and password are correct, this is for logging in
UserModel.authenticate = (username, password) => {
    // Declare block-scoped local variable which holds the userId of user
    let userId;
    
    // SQL command that returns id, password, and username based on given username
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;";

    // Execute SQL command given the username
    return db
    .execute(baseSQL, [username])
    .then(([results, fields]) => {
        // If successfully one row is returned
        if (results && results.length == 1) {
            // Assign the userId as the id of the row returned from the array of rows
            userId = results[0].id;
            // Pass given password to bcrypt to compare it with the username password
            return bcrypt.compare(password, results[0].password);
        } else {
            // Return -1 as a value to handle issue
            return Promise.reject(-1);
        }
    })
    // Promise which checks if the passwords matching is successful
    .then((passwordsMatch) => {
        if (passwordsMatch) {
            /* If both passwords do match, 
            return Promise object with the userId as the value*/
            return Promise.resolve(userId);
        } else {
            // Return -1 as a value to handle issue
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
};

module.exports = UserModel;