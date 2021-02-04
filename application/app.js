var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session')
var mysqlSession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

// Import express handlebars and other routes
var handlebars = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentRouter = require('./routes/comments')
var dbRouter = require('./routes/dbtest');

var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;
const UserError = require('./helpers/error/UserError');
const PostError = require('./helpers/error/PostError');

var app = express();

app.engine(
    "hbs", 
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: '.hbs',
        defaultLayout: "home",
        helper:{
            /**
             * if you need more helpers, 
             * you can register them here
             */
            emptyObject: (obj) => {
                // Three equal signs verify both sides are the same type
                // If object is empty return true, however negate it since we want a false value
                return !(obj.constructor === Object && Object.keys(obj).length == 0);
            }
        },
    })
);

var mysqlSessionStore = new mysqlSession(
    {/* using default options*/
    },
    require('./config/database')
);

// Sessions middleware 
app.use(sessions({
    key: "csid",
    secret:"this is a secret from CSC317",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false,
}))


// Set our express app template engine to handlebars
app.set("view engine", "hbs");
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public/", express.static(path.join(__dirname, 'public')));

// Sets our express app to use the debug printers
app.use((req, res, next) => {
    requestPrint(req.url);
    next();
});

app.use((req, res, next) => {
    // If session has username, set logged in as true
    if(req.session.username){
        res.locals.logged = true;
    }
    next();
})

// Middleware paths
app.use('/', indexRouter);
app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/index', indexRouter);
app.use('/comments', commentRouter);

// Catch ambiguous errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.send('Something went wrong with your database!');
})

// Function that handles Middleware errors
app.use((err, req, res, next) => {
    errorPrint(err);
    res.render('error', {err_message: err});
});

module.exports = app;
