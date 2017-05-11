/** @module users.js 
 *  @description Handles all requests prefixed by /users/. Mostly used for user validation
 *  and ensuring the user is properlly logged in for access to certain pages
 */

var express = require('express');
var mongoose = require('mongoose');
var checker = require('./checkFunc');
var db_models = require('../models/db_init');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { res.send('respond with a resource'); });


/** Router that handles all POST requests with the /users/signUp prefix.
 *  Is called each time a new user signs up for access to the website.
 *  @param req - The POST request made to this router
 *  @param res - The object used to customize a response to the POST request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
router.post('/signUp', function(req, res, next) {
    
  if(!req.body.username || !req.body.password) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
  } else {
    checker.checkPswd(req,res);
  }   
  
});


/** Router that handles all POST requests with the /users/login prefix.
 *  Is called each time a user logs in for access to the website.
 *  @param req - The POST request made to this router
 *  @param res - The object used to customize a response to the POST request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
router.post('/login', function(req, res, next) {
  
  if(!req.body.username || !req.body.password) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
  } else {
    checker.checkLogin(req,res);
  }   
    connection.collection('users').insert(userObj);
  }
}



function connectToDb() {
  mongoose.connect(MONGO_URL, {server: {reconnectTries: Number.Max_Value, reconnectInterval: 3000}});
  var connection = mongoose.connection;
  connection.on('error', console.error.bind(console,'connection error:'));
  return connection;
}


});



/** Router that handles all POST requests with the /users/username/logout prefix.
 *  Is called each time a user logs out from the website and destroys the users
 *  session.
 *  @param req The POST request made to this router
 *  @param res The object used to customize a response to the POST request
 *  @param next Implicitly runs the next part of execution.
 *  @return - void
 */
router.post('/:username/logout', function(req,res,next) {
  req.session.destroy();
  res.redirect('/');
});


/** Router that handles all GET requests with the /users/username prefix. Is called 
 *  each time a user successfully logs into the website
 *  @param req - The POST request made to this router
 *  @param requireLogin - Ensures the user is logged in before accessing this page.
 *  @param res - The object used to customize a response to the POST request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
router.get('/:username', requireLogin, function(req,res,next) {
  res.render('welcome.ejs',{title: 'Welcome ' + req.session.user, username: req.session.user});
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


/** Router that handles all POST requests with the /users/changePass prefix. Is called 
 *  each time the admin clicks submit setPass.ejs
 *  @param req - The POST request made to this router
 *  @param res - The object used to customize a response to the POST request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
router.post('/changePass', function(req,res,next) {
  checker.setPasswordScheme(req.body);
  res.redirect('/users/admin');
});


  console.log(req['body']);
  setPasswordScheme(req['body']);
  res.redirect('/users/admin');
});


router.get('/admin/setPass', function(req,res,next) {
  res.render('setPass.ejs',{title: 'Set a new password scheme.'});
});


/** Router that handles all GET requests with the /users/admin/setPass prefix.
 *  Is called each time the administrator visits setPass.ejs
 *  @param req - The POST request made to this router
 *  @param requireLogin - Ensures the user is logged in before accessing this page.
 *  @param res - The object used to customize a response to the POST request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
router.get('/admin/setPass', requireLogin, function(req,res,next) {
  
  var renderSetPass = function(err,savedRegex) {    
    if(err) return;
    res.render('setPass.ejs',{title: 'Set a new password scheme.',currRegex:
		    checker.getRegexAttrs(savedRegex)});  
  };
  

  db_models.findRegex(renderSetPass);

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

});


/** @function requireLogin
 *  @decription Internal function used to ensure the user is logged in. If user is not
 *  logged in, the page is redirect to index.ejx.
 *  @param req - The request that contains session data if issued by a valid user
 *  @param res - The object used to customize a response to the request
 *  @param next - Implicitly runs the next part of execution.
 *  @return - void
 */
function requireLogin(req,res,next) {
  console.log(req.session.user);
  if(!req.session.user) res.redirect('/');
  else next();
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
