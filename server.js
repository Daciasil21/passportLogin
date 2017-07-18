//for dependencies
//==============================================================================
var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load();
var exphbs = require('express-handlebars')
var mysql = require('mysql');
var PORT = process.env.PORT || 8080;
// var connection;
//=============================================================================
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// For Passport
 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions


//Models
var models = require("./app/models");
 


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

	
//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
//=========================================================================

//get
app.get('/', function(req, res) {
 
    res.send('Welcome to Passport with Sequelize');
 
});

//==========================================================================
// if (process.env.JAWSDB_URL){
// 	connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else{
// 	connection = mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: 'root',
// 		database: 'passport_db'
// 	})
// }
// connection.connect();
// module.exports = connection;
//==========================================================================
//Sync Database

models.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

