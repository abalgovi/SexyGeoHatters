var config = require('../../nightwatch.conf.BASIC.js');

module.exports = {

  // Check if website is loading properly
  'Enqué - Body Load Home': function(browser) {
    browser
    	  .url('https://sexygeohatters-testing.herokuapp.com')
      	.waitForElementVisible('body', 5000)
      	.click('#navbar-collapse-1')
      	.waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct
  'Enqué - Get Title Home': function(browser) {
   	browser.getTitle(function(title) {
    	this.assert.equal(typeof title, 'string');
     	this.assert.equal(title, 'Home');
   	})
  }, 

  // Check if website is loading properly
  'Enqué - Body Load Register': function(browser) {
    browser
        .url('https://sexygeohatters-testing.herokuapp.com/register')
        .waitForElementVisible('body', 5000)
        .click('#navbar-collapse-1')
        .waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct
  'Enqué - Get Title Register': function(browser) {
    browser.getTitle(function(title) {
      this.assert.equal(typeof title, 'string');
      this.assert.equal(title, 'Register');
    })
  }, 

  // Check if website is loading properly
  'Enqué - Body Load Login': function(browser) {
    browser
        .url('https://sexygeohatters-testing.herokuapp.com/login')
        .waitForElementVisible('body', 5000)
        .click('#navbar-collapse-1')
        .waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct
  'Enqué - Get Title Login': function(browser) {
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
      .setValue('input[name="email"]', 'tester@email.com')
      .setValue('input[name="password"]', ['112testerucsd', browser.Keys.ENTER])
  },

  
//   // Inside dashboard check
//   'Enqué - Inside Dashboard page': function(browser) {
//      browser.assert.urlEquals('https://sexygeohatters-testing.herokuapp.com/dashboard').end();
//   }
};
