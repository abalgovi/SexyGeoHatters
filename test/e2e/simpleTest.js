var config = require('../../nightwatch.conf.BASIC.js');

module.exports = {
  'Enqué - Body Load': function(browser) {
    browser
    	.url('https://sexygeohatters-testing.herokuapp.com')
      	.waitForElementVisible('body', 1000)
      	.click('#navbar-collapse-1')
      	.waitForElementVisible('body', 1000)
  },

  'Enqué - Get Title': function(browser) {
   	browser.getTitle(function(title) {
    	this.assert.equal(typeof title, 'string');
     	this.assert.equal(title, 'Landing Page');
   	}).end();
   }
};