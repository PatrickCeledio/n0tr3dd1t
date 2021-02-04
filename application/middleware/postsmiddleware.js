//var db = require("../config/database");
//var PostModel = require('../models/Posts');
const {getNRecentPosts, getPostById} = require('../models/Posts');
const {getCommentsForPost}           = require('../models/Comments');
const postMiddleware = {}


postMiddleware.getRecentPosts = async function(req, res, next) {
    try {
        let results = await getNRecentPosts("25");

        // Object that holds response variable from results
        res.locals.results = results;

        // If no posts are created, therefore no posts at all
        if(results.length == 0){
            req.flash('error', 'There are no posts created yet!');
        }
        next();
    }catch(err) {
        next(err)
    }
}

postMiddleware.getPostById = async function(req, res, next) {
    try {
        let postId = req.params.id; 
        let results = await getPostById(postId);
        if(results && results.length){
            res.locals.currentPost = results[0];
            next();
        }else{
            // If no post to be shown
            req.flash("error", "This is not the post you are looking for!")
            res.redirect('/');
        }
    }catch (error){
        next(err);
    }
}

postMiddleware.getCommentsByPostId = async function(req, res, next) {
    let postId = req.params.id;
    try{
        let results = await getCommentsForPost([postId]);
        res.locals.currentPost.comments = results;
        next();
    }catch (error){
        next(error);
    }
}

module.exports = postMiddleware;