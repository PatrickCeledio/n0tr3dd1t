const e = require("express");
var express = require("express");
var router = express.Router();
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const { create } = require('../models/Comments');

// Create comments functionality
router.post('/create', (req, res, next) => {
    // Send the request on a post on a body
    if (!req.session.username) {
        // If user is not logged in
        errorPrint("Must be logged in to comment");
        res.json({
            code: -1,
            status: "danger",
            message: "Must be logged into create a comment!"
        });
    } else {
        let { comment, postId } = req.body;
        let username = req.session.username;
        let userId = req.session.userId;

        create(userId, postId, comment)
            .then((wasSuccessful) => {
                if (wasSuccessful != -1) {
                    successPrint(`Comment was created for ${username}`);
                    res.json({
                        code: 1,
                        status: "success",
                        message: "Comment created",
                        comment: comment,
                        username: username
                    })
                } else {
                    errorPrint('Comment was not saved');
                    res.json({
                        code: -1,
                        status: "Danger",
                        message: "Comment was not created",
                    })
                }
            }).catch((err) => next(err));
    }

})




module.exports = router;