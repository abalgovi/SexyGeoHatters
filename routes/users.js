var express = require('express');
var mongoose = require('mongoose');

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
    checkPswd(req,res);
  }   
  
});


router.post('/login', function(req, res, next) {
  
  if(!req.body['username'] || !req.body['password']) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
  } else {
    checkLogin(req,res);
  }   

});


function checkLogin(req,res) {
  
  if(!req.body['username'] || !req.body['password']) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']})
    return;
  }

  var usr = req.body['username'], pass = req.body['password'];
  mongoose.model('users',USER_SCHEMA).find({username: usr}, function(err,savedUser) {
	if(!err && savedUser.length > 0 && pass == savedUser[0]['password']) {
	  res.redirect('/users/' + req.body['username']);
	} else {
	  res.render('index.ejs', {title: 'SexyGeoHatters',error: ['Incorrect Username or Password']});
	}
  });   
};


router.get('/:username', function(req,res,next) {
  res.render('welcome.ejs',{title: 'Welcome ' + req.params.username, username: req.params.username});
});


router.post('/changePass', function(req,res,next) {
  console.log(req['body']);
  setPasswordScheme(req['body']);
  res.redirect('/users/admin');
});


router.get('/admin/setPass', function(req,res,next) {
  res.render('setPass.ejs',{title: 'Set a new password scheme.'});
});


function setPasswordScheme(regexParams) {
 
  var regexComponents = {regex: null,numbers: '(?=.*[0-9])',lowercase: '(?=.*[a-z])',
	                 uppercase: '(?=.*[A-Z])', specialChars: null, length: null };

  // end regex contains the [a-zA-Z0-9!@#$%^&*?] options at end of regex
  var strRegex = '', endRegex = '[';
  
  // loop through regexComponents and assemble the regex one at a time
  for(let component in regexComponents) {
    
    // length is the last part of regex so append end regex
    if(component == 'length') {
      strRegex += endRegex + ']' + '{' + regexParams['length'] + ',20}';
      regexComponents['length'] = regexParams['length'];
    } else if(component ==  'specialChars') {
      var spChars = regexParams['spChars'].reduce(function(acc,val) {return acc += val;})
      strRegex += '(?=.*[' + spChars + '])';
      endRegex += spChars;
      regexComponents['specialChars'] = spChars;
    } else if(regexParams[component] == 'yes') {
      endRegex += regexComponents[component].slice(6,9);
      strRegex += regexComponents[component];
      regexComponents[component] = true;
    } else {
      regexComponents[component] = false;
    }
  }

  // persist in mongo
  regexComponents['regex'] = strRegex;
  var rgx_model = mongoose.model('regexes',REGEX_SCHEMA);
  
  rgx_model.findOne(null,function(err,strReg) {
     if(err) console.log(err);
     else {
       rgx_model.findOneAndUpdate({regex: strReg['regex']},regexComponents,{new: true}, function(err,thing) {
		       if(err) console.log(err);
		       else console.log(thing)});
       PASS_REGEX = new RegExp(strRegex);
    }
  }); 
}


// fetches regex from db and then does the comparison
function checkPswd(req,res) {
  
  var passTypes = {numbers: null, lowercase: null, uppercase: null, specialChars: null};

  var rgx_model = mongoose.model('regexes', REGEX_SCHEMA);
  var query = rgx_model.findOne();
   
  query.exec(function(err, saved_regex) {
    
    if(err) {
      console.log(err);
      return;
    }
   
    PASS_REGEX = new RegExp(saved_regex['regex']);
    for(let type in passTypes) passTypes[type] = saved_regex[type];

    if(PASS_REGEX.test(req.body['password'])) {
      res.redirect('/users/' + req.body['username']);
      insertUser({username:(req.body['username']), password: req.body['password']});
    } else {
      
      var passAttrs = [];
      for(var attr in passTypes) {
        if((attr == 'specialChars' && passTypes[attr].length == 0) || !passTypes[attr]) continue;
	if(attr =='specialChars') passAttrs.push('Password must have at least one ' + passTypes[attr]);
	else passAttrs.push('Password must have at least one ' + attr);
      }

      passAttrs.push('Length must be between ' + saved_regex['length'] + '-20 characters.');
      console.log(passAttrs);
      res.render('index.ejs', {error: passAttrs, title: 'SexyGeoHatters'});

    } // end of else
  }); // end of query.exec
};


module.exports = USER_SCHEMA;
module.exports = router;
