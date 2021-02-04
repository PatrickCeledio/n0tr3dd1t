var express = require("express");
var router = express.Router();
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var PostModel = require("../models/Posts");
var PostError = require("../helpers/error/PostError");
//const { response } = require('../app');

var storage = multer.diskStorage({
    // Store file at this destination
    destination: function (req, file, cb) {
        cb(null, "public/images/upload");
    },
    filename: function (req, file, cb) {
        // Stores the file extension of image
        let fileExt = file.mimetype.split("/")[1];
        // Generates a random name for the image
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

// Multer will upload and store the images into the destination initialized above
var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    /**** Do server validation: Make sure title, description, and 
     * fk are not empty. If any values that used for the insert statement 
     * are undefined, mysql.query or execute will fail 
     * with the following error: 
     * BIND parameters cannot be undefined
     * */

    
    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            return PostModel.create(
                title, 
                description, 
                fileUploaded, 
                destinationOfThumbnail, 
                fk_userId
            );
        })
        .then( (postWasCreated) => {
            if (postWasCreated) {
                successPrint("Post was created successfully!");
                req.flash('success', "Post was created successfully!");
                res.redirect('/')
            } else {
                errorPrint("Post unsuccessful");
                req.flash(err);
                throw new PostError('Post could not be created!', 'imagepost', 200);
            }
        })
        .catch((err) => {
            if (err instanceof PostError) {
                errorPrint(err.getMessage());
                req.flash("error", err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.gerRedirectURL());
            } else {
                next(err);
            }
        });
});    

// Search for photos in backend
router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                message: "No search term given",
                results: []
            });
        }else{
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts("8");
                res.send({
                    message: "No results were found for your search, but here are the 8 most recent posts",
                    results: results
                });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;