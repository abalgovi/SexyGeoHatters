var config = require('../../nightwatch.conf.BASIC.js');

module.exports = {

  // Check if website is loading properly
  'Enqué - Home Page Load': function(browser) {
    browser
    	  .url('https://sexygeohatters-testing.herokuapp.com')
      	.waitForElementVisible('body', 5000)
      	.click('#navbar-collapse-1')
      	.waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct Home
  'Enqué - Get Home Title': function(browser) {
   	browser.getTitle(function(title) {
    	this.assert.equal(typeof title, 'string');
     	this.assert.equal(title, 'Home');
   	})
  }, 

  // Direct to login
  'Enqué - Login Page Load': function(browser) {
    browser
        .url('https://sexygeohatters-testing.herokuapp.com/login')
        .waitForElementVisible('body', 5000)
        .click('#navbar-collapse-1')
        .waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct Login
  'Enqué - Get Login Title': function(browser) {
    browser.getTitle(function(title) {
      this.assert.equal(typeof title, 'string');
      this.assert.equal(title, 'Login');
    })
  }, 

  // Valid Login Testing 
  'Enqué - Valid Login': function(browser) {
    browser
      .url('https://sexygeohatters-testing.herokuapp.com/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name="email"]', 'sexygeo@email.com')
      .setValue('input[name="password"]', ['HelloWorld11', browser.Keys.ENTER])
  },

  // Direct to Register
  'Enqué - Register Page Load': function(browser) {
    browser
        .url('https://sexygeohatters-testing.herokuapp.com/register')
        .waitForElementVisible('body', 5000)
        .click('#navbar-collapse-1')
        .waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct Register
  'Enqué - Get Register Title': function(browser) {
    browser.getTitle(function(title) {
      this.assert.equal(typeof title, 'string');
      this.assert.equal(title, 'Register');
    })
  }, 

};
