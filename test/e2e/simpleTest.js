var config = require('../../nightwatch.conf.BASIC.js');

module.exports = {

  // Check if website is loading properly
  'Enqué - Body Load': function(browser) {
    browser
    	  .url('https://sexygeohatters-testing.herokuapp.com')
      	.waitForElementVisible('body', 5000)
      	.click('#navbar-collapse-1')
      	.waitForElementVisible('body', 5000)
  },

  // Get if title of the website is correct
  'Enqué - Get Title': function(browser) {
   	browser.getTitle(function(title) {
    	this.assert.equal(typeof title, 'string');
     	this.assert.equal(title, 'Home');
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

  // Inside dashboard check
  'Enqué - Inside Dashboard page': function(browser) {
     browser.assert.urlEquals('https://sexygeohatters-testing.herokuapp.com/login').end();
  }
};
