var express = require('express');
var mongoose = require('mongoose');
var checker = require('./checkFunc.js');

var router = express.Router();

var MONGO_URL = 'mongodb://randomgeohatter:sexygeohatters@ds115071.mlab.com:15071/sexygeohatters';
var PASS_REGEX = '';
var USER_SCHEMA = new mongoose.Schema({ username: String, password: String });
var REGEX_SCHEMA = new mongoose.Schema({ regex: String, numbers: Boolean,
					                         lowercase: Boolean, uppercase: Boolean,
								 specialChars: String, length: Number});


var connection = connectToDb();
connection.once('open', function() {
  
 mongoose.connection.db.listCollections().toArray(function(err,names) {
	if(err) console.log(err);
	else if(names.length != 3) {
	  for(let collection in collections) collections[collection]();
	}
 });
        
         var collections = {
	   users: function() {
			    
	 		var usr_model = mongoose.model('users',USER_SCHEMA);
	 		var new_usr = new usr_model({username: 'admin', password: 'sexygeohatters'});

	 		new_usr.save(function (err) {
 	   		  if(err) return handleError(err);
	 		})},

	   regexes: function() {
      
          		var regex_model = mongoose.model('regexes',REGEX_SCHEMA);
	 		var regex = new regex_model({
                           regex:'(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?*@#$%&_])[A-Za-z0-9!@#$%&*?_]{8,20}', 
			   numbers: true, lowercase: true, uppercase: true, specialChars: '!?*@#$%&_',
			   length: 8
			});

         		regex.save(function (err) {
 	   		  if(err) return handleError(err);
	   		  console.log("SAVED REGEX TO DB!!");
	 		})}
	 }
});

// called when a user signs up for website
function insertUser(userObj) {
  if(!mongoose.connection.readyState) {
    connection = connectToDb();
    connection.once('open', function() { connection.collection('users').insert(userObj); });
  } else {
    connection.collection('users').insert(userObj);
  }
}

function connectToDb() {
  mongoose.connect(MONGO_URL, {server: {reconnectTries: Number.Max_Value, reconnectInterval: 3000}});
  var connection = mongoose.connection;
  connection.on('error', console.error.bind(console,'connection error:'));
  return connection;
}


/* GET users listing. */
router.get('/', function(req, res, next) { res.send('respond with a resource'); });


// handles all post requests to /users for signup
router.post('/signUp', function(req, res, next) {
  
  if(!req.body['username'] || !req.body['password']) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
  } else {
    checker.checkPswd(req,res);
  }   
  
});

router.post('/login', function(req, res, next) {
  
  if(!req.body['username'] || !req.body['password']) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
  } else {
    checker.checkLogin(req,res);
  }   

});

router.get('/:username', function(req,res,next) {
  res.render('welcome.ejs',{title: 'Welcome ' + req.params.username, username: req.params.username});
});


router.post('/changePass', function(req,res,next) {
  console.log(req['body']);
  checker.setPasswordScheme(req['body']);
  res.redirect('/users/admin');
});


router.get('/admin/setPass', function(req,res,next) {
  res.render('setPass.ejs',{title: 'Set a new password scheme.'});
});

module.exports = USER_SCHEMA;
module.exports = router;
