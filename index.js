//Call express to be used in this app 
const express = require("express"); //
const path = require("path");//
var app = express();//
var bodyParser = require('body-parser');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://isaac:student@localhost:5432/finaldb";
const pool = new Pool({connectionString : connectionString});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//body parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Set your port locally or in Heroku
const PORT = process.env.PORT || 5000;

//public folder availible
app.use(express.static(path.join(__dirname, 'public')));

//This endpoint opens the Views folder files
app.get('/', function(req, res) {
  console.log('Request with /')
    res.render('login', { title: 'The Login page!' })
  });
  app.get('/index', function(req, res) {
    console.log('Request with /index')
    res.render('login', { title: 'The login page!' })
  });






//Endpoint to validate in PG the user and password
  app.post('/loginVerify?', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
res.json({message: '✅✅✅', email, password});
var sqlVer = "SELECT credentials_id, email, username, password FROM credentials WHERE email=$1::text AND password=$2::text";
var params = [email, password];

pool.query(sqlVer, params,function(err, connectionString_results){
  if(err){    
    throw err;    
      } else {
        console.log ("Back from the database with: ");
        var results = JSON.parse(JSON.stringify(connectionString_results));
        console.log(results.data);
        //console.log (connectionString_results);
        
        //////////How to change a JSON object to a tring or array
        
        
      }
});

  });



//Not found handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: req.app.get('env') === 'development' ? err : {}
  });
});

//set the listening to the server
app.listen(PORT, function(){
   console.log("Listening on port: " + PORT);
});


