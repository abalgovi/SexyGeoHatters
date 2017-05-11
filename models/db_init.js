var express = require('express');
var mongoose = require('mongoose');

var exports = module.exports = {};

var TTL_COLLECTIONS = 4;
var MONGO_URL = 'mongodb://randomgeohatter:sexygeohatters@ds115071.mlab.com:15071/sexygeohatters';
var PASS_REGEX = '';
var USER_SCHEMA = new mongoose.Schema({ username: String, password: String });

var REGEX_SCHEMA = new mongoose.Schema({ regex: String, numbers: Boolean,
					                         lowercase: Boolean, uppercase: Boolean,
								 specialChars: String, length: Number});

var USR_MODEL = mongoose.model('users',USER_SCHEMA);
var REGEX_MODEL = mongoose.model('regexes',REGEX_SCHEMA);


var connection = connectToDb();
connection.once('open', function() {
  
 mongoose.connection.db.listCollections().toArray(function(err,names) {
	if(err) console.log(err);
	else if(names.length != TTL_COLLECTIONS) {
	  for(let collection in collections) collections[collection]();
	}
 });
        
         var collections = {
	   users: function() {
			    
	 		var new_usr = new USR_MODEL({username: 'admin', password: 'sexygeohatters'});

	 		new_usr.save(function (err) {
 	   		  if(err) return handleError(err);
			  console.log("CREATED USR COLLECTION!!");
	 		});
	   },

	   regexes: function() {
      
	 		var regex = new REGEX_MODEL({
                           regex:'(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?*@#$%&_])[A-Za-z0-9!@#$%&*?_]{8,20}', 
			   numbers: true, lowercase: true, uppercase: true, specialChars: '!?*@#$%&_',
			   length: 8
			});

         		regex.save(function (err) {
 	   		  if(err) return handleError(err);
	   		  console.log("CREATED REGEX COLLECTION!!");
	 		});
		   }
	 };
});


function connectToDb() {
  mongoose.connect(MONGO_URL, {server: {reconnectTries: Number.Max_Value, reconnectInterval: 3000}});
  var connection = mongoose.connection;
  connection.on('error', console.error.bind(console,'connection error:'));
  return connection;
}


function insertNewUser(userObj) {

  if(!mongoose.connection.readyState) {
    connection = connectToDb();
    connection.once('open', function() { connection.collection('users').insert(userObj); });
  } else {
    console.log(connection.collection('users').insert(userObj));
  }

}


function findRegex(checkFunc,req,res) {
  REGEX_MODEL.findOne(null,function(err,savedRegex) {
        if(!err) checkFunc(null,savedRegex,req,res);
	else {
	  checkFunc(err,null,req,res);
	  console.log(err);
	}
  });
}


function updateRegex(regexComponents) {
  
  REGEX_MODEL.findOne(null,function(err,strReg) {
    if(err) console.log(err);
    else {
      REGEX_MODEL.findOneAndUpdate({regex: strReg.regex},regexComponents,{new: true}, function(err,thing) {
           if(err) console.log(err);
      });
    }
  });
} 

function findUser(username,loginFunc,req,res) {
  USR_MODEL.findOne({username: username},function(err,registeredUser) {
	if(err) {
	  console.log(err);
	  loginFunc(err,null,req,res);
	} else {
	  loginFunc(null,registeredUser,req,res);
	}
  });
}

exports.connection = connection;
exports.saveUser = insertNewUser;
exports.findUser = findUser;
exports.updateRegex = updateRegex;
exports.findRegex = findRegex;
