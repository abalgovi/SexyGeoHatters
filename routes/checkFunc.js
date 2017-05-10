/** @module checkFunc.js
 *  @description Contains functions that check login input, signup input, and password setting input. Some
 * functions persist input data to the mongodb while others fetch data from the database.
 */

var express = require('express');
var mongoose = require('mongoose');
var db_models = require('../models/db_init');

var exports = module.exports = {};

/** @function checkPswd
 *  @description - Ensures the password a user types in the signUp form complies with the
 *  password requirements set by admin.
 *  @param req - request object that contains user input
 *  @param res - response object used to render pages depending on input
 *  @return - void
 */
function checkPswd(req,res) {
  
  var validatePassword = function(err,currRegex) { 
    
    if(err) return;
    var passRegex = new RegExp(currRegex.regex);

    if(passRegex.test(req.body.password)) {
      db_models.saveUser({username: req.body.username, password: req.body.password});
      res.redirect('/users/' + req.body.username);
    } else {
      res.render('index.ejs', {error: getRegexAttrs(currRegex), title: 'SexyGeoHatters'});
    }
  
  };
  
  db_models.findRegex(validatePassword);

}


/** @function setPasswordScheme
 *  @description - captures admin specified input as a regex and persists the regex.
 *  @param regexParams - the admin specified components of the regex 
 *  @return - void
 */
function setPasswordScheme(regexParams) {
 
  var regexComponents = {regex: null,numbers: '(?=.*[0-9])',lowercase: '(?=.*[a-z])',
                   uppercase: '(?=.*[A-Z])', specialChars: null, length: null };

  // end regex contains the [a-zA-Z0-9!@#$%^&*?] options at end of regex
  var strRegex = '', endRegex = '[';
  
  // loop through regexComponents and assemble the regex one at a time
  for(let component in regexComponents) {
    
    // length is the last part of regex so append end regex
    if(component == 'length') {
      strRegex += endRegex + ']' + '{' + regexParams.length + ',20}';
      regexComponents.length = regexParams.length;
    } else if(component ==  'specialChars' && regexParams.spChars) {
      var spChars = regexParams.spChars.reduce(function(acc,val) {return acc += val;});
      strRegex += '(?=.*[' + spChars + '])';
      endRegex += spChars;
      regexComponents.specialChars = spChars;
    } else if(regexParams[component] == 'yes') {
      endRegex += regexComponents[component].slice(6,9);
      strRegex += regexComponents[component];
      regexComponents[component] = true;
    } else {
      regexComponents[component] = (component == 'specialChars') ? '' : false;
    }
  }

  // persist in mongo
  regexComponents.regex = strRegex;
  db_models.updateRegex(regexComponents);
  
}


/** @function checkLogin
 *  @description - verifies whether the user is registered with the website 
 *  @param req - request object that contains user's username and password
 *  @param res - response object used to render pages depending on input
 *  @return - void
 */
function checkLogin(req,res) {
  
  if(!req.body.username || !req.body.password) {
    res.render('index.ejs', {title:'SexyGeoHatters', error:['Provide Username and Password']});
    return;
  }

  var verifyLogin = function(err,savedUser) {
    if(!err && savedUser && req.body.password == savedUser.password) {
      req.session.user = savedUser.username;
      res.redirect('/users/' + req.body.username);
    } else {
      res.render('index.ejs', {title: 'SexyGeoHatters',error: ['Incorrect Username or Password']});
    }
  };

  db_models.findUser(req.body.username,verifyLogin);

}

/** @function getRegexAttrs
 *  @description - constructs and array of messages to print about the current password
 *  requirements. Uses the current password characteristics to display the requirements
 *  @param savedRegex - the regex that represents password requirements
 *  @return - an array of strings that describe password requirements
 */
function getRegexAttrs(savedRegex) {

  var attrs = {'numbers': null,'lowercase': null,'uppercase': null,'specialChars': null};
  for(let attr in attrs) attrs[attr] = savedRegex[attr]; 
  var passAttrs = [];
  
  for(let attr in attrs) {
    if((attr == 'specialChars' && attrs[attr].length === 0) || !attrs[attr]) continue;
    if(attr =='specialChars') passAttrs.push('Password must have at least one ' + attrs[attr]);
    else passAttrs.push('Password must have at least one ' + attr);
  }
  
  passAttrs.push('Length must be between ' + savedRegex.length + '-20 characters.');
  return passAttrs;

}


exports.getRegexAttrs = getRegexAttrs;
exports.setPasswordScheme = setPasswordScheme;
exports.checkPswd = checkPswd;
exports.checkLogin = checkLogin;


