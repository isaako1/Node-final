var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://isaac:student@localhost:5432/finaldb";
const pool = new Pool({connectionString : connectionString});
router.use(express.json());

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
  var resultStringed = [];
  var emailQuery = "nope";
  var passQuery = "nope";




  var email = req.body.email;
  var password = req.body.password;

var sqlVer = "SELECT credentials_id, email, username, password FROM credentials WHERE email=$1::text AND password=$2::text";
var params = [email, password];

pool.query(sqlVer, params,function(err, connectionString_results){
if(err){    
  throw err;    
    } else if(connectionString_results.rows.length == 0){ 
        result = {success: false};
        

    }
    
    else {
    
      console.log ("Back from the database with: ");
      var loginQuery = JSON.parse(JSON.stringify(connectionString_results.rows));
      //console.log(connectionString_results);
      for(var i in loginQuery)
      resultStringed.push([i, loginQuery[i]]);

      console.log(resultStringed[0][1]);
      //console.log(resultStringed[0][1].email);
      //console.log("test"+connectionString_results.rowCount);

      
     emailQuery = resultStringed[0][1].email;
     passQuery = resultStringed[0][1].password;
    }

console.log("username: " + req.body.email);
console.log("password: " + req.body.password);

console.log("username QUERY: " + emailQuery);
console.log("password QUERY: " + passQuery);
    if (req.body.email == emailQuery && req.body.password == passQuery) {
        //hange your /login so that if the correct username and password
        // are received it stores the username on the session.
        req.session.user = req.body.email;
        console.log("Session user: " + req.session.user);
        //set true
        result = {success: true};
       
    }

    
console.log(result);
   // res.json(result);
    //Verify that you get the expected results
    // on the HTML page. Please note that nothing
    // is being stored on the session yet.
    if(req.session.user){
      res.render('index.ejs');
    }
    else{
      res.json(result);
    }
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
});




module.exports = router;
