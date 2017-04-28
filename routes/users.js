var express = require('express');
var mongoose = require('mongoose');
var checker = require('./checkFunc');
var db_models = require('../models/db_init');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { res.send('respond with a resource'); });



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


router.post('/:username/logout', function(req,res,next) {
  req.session.destroy();
  res.redirect('/');
});


router.get('/:username', requireLogin, function(req,res,next) {
  res.render('welcome.ejs',{title: 'Welcome ' + req.session.user, username: req.session.user});
});


router.post('/changePass', function(req,res,next) {
  checker.setPasswordScheme(req['body']);
  res.redirect('/users/admin');
});


router.get('/admin/setPass', requireLogin, function(req,res,next) {
  
  var renderSetPass = function(err,savedRegex) {    
    if(err) return;
    res.render('setPass.ejs',{title: 'Set a new password scheme.',currRegex:
		    checker.getRegexAttrs(savedRegex)});  
  }
  
  db_models.findRegex(renderSetPass);

});


function requireLogin(req,res,next) {
  console.log(req.session.user);
  (!req.session.user) ? res.redirect('/') : next();
}


module.exports = router;
