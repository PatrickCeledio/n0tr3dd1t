// Import necessary items:
var express = require("express");
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt');
const UserModel = require('../models/Users');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
const {body, check, validationResult} = require("express-validator");



// Create user account
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.password;

  check(username).not().isEmpty().withMessage("Username must not be empty.");

  // Promise chain for UserModel.usernameExists()
  UserModel.usernameExists(username)
    .then((userDoesNameExist) => {
      if (userDoesNameExist) {
        // Error: The username already exists in the database
        req.flash('error', err.getMessage());
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      } else {
        // If username does exists, return email
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      // Error: The email already exists in the database
      if (emailDoesExist) {
        req.flash('error', err.getMessage());
        throw new UserError(
          "Registration Failed: Email already exists",
          "/registration",
          200
        );
      } else {
        /* Is email does not already exists in the database,
        pass username, password, and email to the create function
        in /models/Users.js */
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      /* id must be greater than 0 or else 
      there was no creation at all or there was a mishap */
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      } else {
        successPrint(`User.js --> ${username} was created.`);
        req.flash('Success', 'User account has been made!');
        res.redirect('/login');
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
});

// Create user session
router.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {

        // Template string with backticks; ${username} = string of username
        successPrint(`User ${username} is logged in`);

        // Initialize session for logged in user
        req.session.username = username;

        // Add user id to session which will display in the database
        req.session.userId = loggedUserId;

        // Sets user as logged in
        res.locals.logged = true;

        // Prompts user for successful login
        req.flash("success", "Log in successful!");

        // Redirect to homepage after log in; render is depreciated as we want to direct the user, not send them an HTML
        res.redirect("/");

      } else {
        throw new UserError("User authentication failed: Most likely a wrong password.", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("User login failed");
      if (err instanceof UserError) {

        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        // Refresh login page
        res.redirect("/login");
        
      } else {
        next(err);
      }
    });
});

// Destroy user session
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
      if(err){
      // If there was an error where user cannot log out for some reason
      errorPrint('Session could not be destroyed!');
      next(err);
    }else{
      successPrint("Session was destroyed! uWu =^__^=");
      res.clearCookie('csid');
      res.json({status: "OK", message:"User has logged out."});
    }
  })
});
module.exports = router;
