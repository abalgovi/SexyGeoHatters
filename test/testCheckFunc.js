var chai = require('chai');   
var expect = chai.expect;  

var express = require('express');
var app = express();

// Request from heroku app
var request = require('supertest');
var server = request.agent('https://sexygeohatters.herokuapp.com');

// Server Testing https://sexygeohatters.herokuapp.com
describe('Local Server Testing on: https://sexygeohatters.herokuapp.com', function() {

   // Server return 200 OK when running 
   it('responds 200 OK to /', function(done) {
      server.get('/')
      .expect(200)
      .end(function(err, res){
         expect(res.statusCode).to.equal(200);
         expect(res.type).to.equal('text/html');
         expect(res.charset).to.equal('utf-8');
         done();
      });
   });
});


// Functionalities (Backend) Testing 
describe('Backend Testing on: https://sexygeohatters.herokuapp.com', function () {

   // Sign up valid testing (Username: cse112ucsdTest, password: Helloworld11)
   it('Sign Up cse112ucsdTest - Valid Input', function (done) {
      server.post('/users/signup')
      .send({username: 'cse112ucsdTest', password: 'Helloworld11#'})
      .expect(302)
      .end(function(err, res){
         expect(res.statusCode).to.equal(302);
         expect(res.type).to.equal('text/plain');
         expect(res.charset).to.equal('utf-8');
         // User succesfully created and redirected to the path 
         expect(res.text).to.equal('Found. Redirecting to /users/cse112ucsdTest'); 
         done();
      });
   });

   // Sign up invalid testing 
   it('Sign Up dsdadsd - Invalid Input', function (done) {
      server.post('/users/signup')
      .send({username: 'dsdadsd', password: '23213'})
      .expect(200)
      .end(function(err, res){
         expect(res.statusCode).to.equal(200);
         expect(res.type).to.equal('text/html');
         expect(res.charset).to.equal('utf-8');
         // Make sure does not redirect, since sign up is invalid
         expect(res.text).to.not.equal('Found. Redirecting to /users/cse112ucsdTest'); 
         done();
      });
   });

   // Sign in with the above created user account (Username: cse112ucsdTest, password: Helloworld11)
   it('Sign in cse112ucsdTest - User Exist (cse112ucsdTest)', function (done) {
      server.post('/users/login')
      .send({username: 'cse112ucsdTest', password: 'Helloworld11#'})
      .expect(302)
      .end(function(err, res){
         expect(res.statusCode).to.equal(302);
         expect(res.type).to.equal('text/plain');
         expect(res.charset).to.equal('utf-8');
         // User Found and Redirected 
         expect(res.text).to.equal('Found. Redirecting to /users/cse112ucsdTest'); 
         done();
      });
   });

   // Sign in with non-existent user account
   it('Sign in adsddsad - Non-existent User', function (done) {
     server.post('/users/login')
      .send({username: 'adsddsad', password: 'Helloworld11'})
      .expect(200)
      .end(function(err, res){
         expect(res.statusCode).to.equal(200);
         expect(res.type).to.equal('text/html');
         expect(res.charset).to.equal('utf-8');
         // Check if being redirected
         expect(res.text).to.not.equal('Found. Redirecting to /users/adsddsad'); 
         done();
      });
   });

   // Admin sign in
   it('Sign in - admin', function (done) {
      server.post('/users/login')
      .send({username: 'admin', password: 'sexygeohatters'})
      .expect(302)
      .end(function(err, res){
         expect(res.statusCode).to.equal(302);
         expect(res.type).to.equal('text/plain');
         expect(res.charset).to.equal('utf-8');
         expect(res.text).to.equal('Found. Redirecting to /users/admin'); 
         done();
      });
   });

   // SetPass    
});



