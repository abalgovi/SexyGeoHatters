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


router.get('/:username', function(req,res,next) {
  res.render('welcome.ejs',{title: 'Welcome ' + req.params.username, username: req.params.username});
});


router.post('/changePass', function(req,res,next) {
  checker.setPasswordScheme(req['body']);
  res.redirect('/users/admin');
});


router.get('/admin/setPass', function(req,res,next) {
  
  var renderSetPass = function(err,savedRegex) {    
    if(err) return;
    res.render('setPass.ejs',{title: 'Set a new password scheme.',currRegex:
		    checker.getRegexAttrs(savedRegex)});  
  }
  
  db_models.findRegex(renderSetPass);

});


module.exports = router;
