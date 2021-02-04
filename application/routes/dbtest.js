const express   = require('express');
const router    = express.Router();
// Refernces the pool object in database.js
const db        = require('../config/database');

// Fetch all the rows from table Users from database `csc317project`
router.get('/getAllUsers', (req, res, next) => {
    db.query('SELECT * from users;', (err, results, fields) => 
    {
        if(err){
            // passes error to next middleware function
            next(err);
        }
        console.log(results);
        res.send(results);
    })
});

// Fetch all the rows from table Posts from database `csc317project`
router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * from posts;', (err, results, fields) => 
    {
        console.log(results);
        res.send(results);
    })

    .catch((err) => {
        next(err);
    })
    
});

// Does the same function as /getAllPosts, but we are using .then() to 
// return a resolved promise

// We are chaining two .then() functions
router.get('/getAllPostsP', (req, res, next) => {
    db.query('SELECT * from posts;')
    .then(([results, fields]) => {
        console.log(results);
        return db.query('SELECT * FROM posts where id=2')
    })
    .then(([results, fields]) => {
        console.log(results);
        res.send(results);
    })
});

// Create new user from accepting data in front end
router.post('/createUser', (req, res, next) => {
    // Returns data
    console.log(req.body);
    
    let username    = req.body.username;
    let email       = req.body.email;
    let password    = req.body.password;

    // validate data, if bad send back response
    // res.redirect('/registration')

    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())'; 
    db.query(baseSQL, [username, email, password]).then(([results, fields]) => {
        if (results && results.affectedRows){
            res.send('user was made');
        }else{
            res.send('user was not made for some reason lol oops bye bye1')
        }
    })
})

module.exports = router;

