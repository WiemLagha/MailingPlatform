var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const router=express.Router();
var cons = require('consolidate');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"mailingplatform"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.engine('html', cons.swig)
app.set('html', path.join('../html'));
app.set('view engine', 'html');

//get pages
app.get('/',function(request,response){
  response.render('sign in.html',{root:'../html'});
})


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



/*app.get('/', function(request, response) {
  response.sendFile('sign in.html',{root:'../html'});
 
});*/

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('../html/campaigns.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.listen(3000);