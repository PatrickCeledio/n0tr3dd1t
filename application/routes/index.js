// Import necessary items:

// Loads the express module
var express = require('express');
// Express application
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
//var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require("../config/database");
/* GET home page. */

// Sets up the root path --> localhost:3000
router.get('/', getRecentPosts, function (req, res, next) {
  //next(new Error('test'));
  res.render('index', {title:"Homepage | Application"});
});

router.get('/login', (req, res, next) => {
  res.render('login', {title:"Log In | Application"});
});

router.get('/registration', (req, res, next) => {
  res.render('registration', {title:"Register | Application"});
});

router.get('/viewpost', (req, res, next) => {
  res.render('viewpost', {title:"View Post | Application"});
});

// Prevents unlogged sessions from uploading images
router.use('/imagepost', isLoggedIn);

router.get('/imagepost', (req, res, next) => {
  res.render('imagepost', {title:"Post an Image | Application"});
});

// When we call this function, it gets all information for that post, then the comments, then render the page at /viewpost
router.get("/post/:id(\\d+)", getPostById, getCommentsByPostId, (req, res, next) => {
  res.render("viewpost", { title: `Post ${req.params.id}`});
});

router.get('/reported', (req, res, next) => {
  res.render("reported", {title:"Reported | Application"});
});


module.exports = router;
