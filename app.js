var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');



var app = express();
// We are going to use sessions
var session = require('express-session');

// set up sessions
app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logRequest);
app.use('/', indexRouter);
app.use('/login', indexRouter);




function verifyLogin(request, response, next) {
    if (request.session.user) {
        // They are logged in!

        // pass things along to the next function
        next();
    } else {
        // They are not logged in
        // Send back an unauthorized status
        var result = {success:false, message: "Access Denied"};
        response.status(401).json(result);
    }
}
function logRequest(request, response, next) {
    console.log("Received a request for: " + request.url);


    next();
}
module.exports = app;
