var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://isaac:student@localhost:5432/finaldb";
const pool = new Pool({connectionString : connectionString});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});


router.post('/login', function(req, res, next) {
    //Check to see if the username is "admin"
    //and the password is "password" if it is,
    // return a JSON object with a success value
    // set to true. If you do not receive these values,
    // return a JSON object with success set to false.
  var result = {success: false};





  var email = req.body.email;
  var password = req.body.password;

var sqlVer = "SELECT credentials_id, email, username, password FROM credentials WHERE email=$1::text AND password=$2::text";
var params = [email, password];

pool.query(sqlVer, params,function(err, connectionString_results){
if(err){    
  throw err;    
    } else {
        console.log (connectionString_results);
      console.log ("Back from the database with: ");
      var loginQuery = JSON.parse(JSON.stringify(connectionString_results));
      console.log(loginQuery);
    }



});




console.log("username: " + req.body.email);
console.log("password: " + req.body.password);
    if (req.body.email == "san16044@byui.edu" && req.body.password == "testing") {
        //hange your /login so that if the correct username and password
        // are received it stores the username on the session.
        req.session.user = req.body.email;
        //set true
        result = {success: true};
    }
console.log(result);
    res.json(result);
    //Verify that you get the expected results
    // on the HTML page. Please note that nothing
    // is being stored on the session yet.
});

router.post('/logout', function(req, res, next) {
    //It should first check if the username is on the session
if (req.session.user){
    //If it is, it should destroy the session
      req.session.destroy();
    // and return a JSON object with a success value set to true.
    result = {success: true};
    console.log('Logout successful');
    console.log(result);
}
else {
    //f the username is not present on the session,
    // return a JSON object with success set to false.
    result = {success: false};
    console.log(result);
}
    res.json(result);

});


router.get('/getServerTime', function(req, res, next) {
    //You get get the server time with code like:
    var time = new Date();
    //Create a Get route for /getServerTime that returns a
    // JSON object with a success value set to true and a
    // time attribute set to the server time.
    var result = {success: true, time: time};
    res.json(result);
});

module.exports = router;
