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
    //checker.checkPswd(req,res);
    checkPswd(req,res);
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


module.exports = router;
