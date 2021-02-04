const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const { route } = require("../routes");
const routeProtectors = {};

// When express recieves a request: -> mw1 -> mw2 -> mw3 -> ... -> mwN -> router.HTTPVERB
routeProtectors.userIsLoggedIn = function(req, res, next){
    if(req.session.username){
        successPrint('User is logged in!');
        next();
    }else{
        errorPrint('User is not logged in!');
        req.flash('error', 'You must be logged in to create a post!');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;