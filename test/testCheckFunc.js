// var chai = require('chai');   
// // var expect = chai.expect;  

var express = require('express');
var app = express();

// Request from heroku app
var request = require('supertest');
var server = request.agent('https://sexygeohatters.herokuapp.com');

// Server Testing https://sexygeohatters.herokuapp.com
describe('Local Server Testing on: https://sexygeohatters.herokuapp.com', function () {

   // Server return 200 OK when running 
   it('responds 200 OK to /', function (done) {
      server.get('/').expect(200, done);
   });
});


// Functionalities (Backend) Testing 
describe('Backend Testing on: https://sexygeohatters.herokuapp.com', function () {

   // Sign up valid testing (Username: cse112ucsdTest, password: Helloworld11)
   it('Sign Up Testing - Valid Input', function (done) {
      server.post('/users/signup').send({username: 'cse112ucsdTest', password: 'Helloworld11'}).expect(302, done);
   });

   // Sign up invalid testing 
   it('Sign Up Testing - Invalid Input', function (done) {
      server.post('/users/login').send({username: 'cse112ucsd', password: 'whatever'}).expect(200, done);
   });

   // Sign in with exist user account (Username: cse112ucsdTest, password: Helloworld11)
   it('Sign in Testing - User Exist (cse112ucsdTest)', function (done) {
      server.post('/users/login').send({username: 'cse112ucsdTest', password: 'Helloworld11'}).expect(302, done);
   });

   // User Logout Test
   it('Logout Testing - cse112ucsdTest', function (done) {
      done();
   });

   // Sign in with admin account (Username: admin, password: Sexygeohatters)
   it('Sign in Testing - Administrator (admin)', function (done) {
       server.post('/users/login').send({username: 'admin', password: 'sexygeohatters'}).expect(302, done);
   });

   // Admin Logout Test
   it('Logout Testing - admin', function (done) {
      done();
   });

   // Sign in with non-existent user account
   it('Sign in Testing - Non-existent User', function (done) {
     server.post('/users/login').send({username: 'admin', password: 'sexygeohatters'}).expect(302, done);
   });

   // Admin Set Password Scheme
   it('Set Password Scheme - admin', function (done) {
      done();
   });
   
});



