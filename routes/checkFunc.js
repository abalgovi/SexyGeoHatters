var express = require('express');
var mongoose = require('mongoose');
var db_models = require('../models/db_init');

var exports = module.exports = {};


// fetches regex from db and compares. Called when a user signs up for site
function checkPswd(req,res) {
  
  var validatePassword = function(err,currRegex) { 
    
    if(err) return;
    var passRegex = new RegExp(currRegex['regex']);

    if(passRegex.test(req.body['password'])) {
      db_models.saveUser({username: req.body['username'], password: req.body['password']});
      res.redirect('/users/' + req.body['username']);
    } else {
      res.render('index.ejs', {error: getRegexAttrs(currRegex), title: 'SexyGeoHatters'});
    }
  
  }
  
  db_models.findRegex(validatePassword);

}



function setPasswordScheme(regexParams) {
 
  var regexComponents = {regex: null,numbers: '(?=.*[0-9])',lowercase: '(?=.*[a-z])',
                   uppercase: '(?=.*[A-Z])', specialChars: null, length: null };

  // end regex contains the [a-zA-Z0-9!@#$%^&*?] options at end of regex
  var strRegex = '', endRegex = '[';
  console.log(regexParams); 
  // loop through regexComponents and assemble the regex one at a time
  for(let component in regexComponents) {
    
    // length is the last part of regex so append end regex
    if(component == 'length') {
      strRegex += endRegex + ']' + '{' + regexParams['length'] + ',20}';
      regexComponents['length'] = regexParams['length'];
    } else if(component ==  'specialChars' && regexParams['spChars']) {
      var spChars = regexParams['spChars'].reduce(function(acc,val) {return acc += val;})
      strRegex += '(?=.*[' + spChars + '])';
      endRegex += spChars;
      regexComponents['specialChars'] = spChars;
    } else if(regexParams[component] == 'yes') {
      endRegex += regexComponents[component].slice(6,9);
      strRegex += regexComponents[component];
      regexComponents[component] = true;
    } else {
      regexComponents[component] = (component == 'specialChars') ? '' : false;
    }
  }

  // persist in mongo
  regexComponents['regex'] = strRegex;
  db_models.updateRegex(regexComponents);
  
}



function checkLogin(req,res) {
  
  if(!req.body['username'] || !req.body['password']) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']})
    return;
  }

  var verifyLogin = function(err,savedUser) {
    if(!err && savedUser && req.body['password'] == savedUser['password']) {
      req.session.user = savedUser.username;
      res.redirect('/users/' + req.body['username']);
    } else {
      res.render('index.ejs', {title: 'SexyGeoHatters',error: ['Incorrect Username or Password']});
    }
  };

  db_models.findUser(req.body['username'],verifyLogin);

};


function getRegexAttrs(savedRegex) {

  var attrs = {'numbers': null,'lowercase': null,'uppercase': null,'specialChars': null};
  for(var attr in attrs) attrs[attr] = savedRegex[attr]; 
  var passAttrs = [];
  
  for(var attr in attrs) {
    if((attr == 'specialChars' && attrs[attr].length == 0) || !attrs[attr]) continue;
    if(attr =='specialChars') passAttrs.push('Password must have at least one ' + attrs[attr]);
    else passAttrs.push('Password must have at least one ' + attr);
  }
  
  passAttrs.push('Length must be between ' + savedRegex['length'] + '-20 characters.');
  return passAttrs;

}


exports.getRegexAttrs = getRegexAttrs;
exports.setPasswordScheme = setPasswordScheme;
exports.checkPswd = checkPswd;
exports.checkLogin = checkLogin;
