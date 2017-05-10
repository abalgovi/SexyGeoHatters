var chai = require('chai');  // Required to test node.js locally
var expect = chai.expect;    

var foo = require('../public/javascripts/starter.js'); // Required to test node.js locally 

// Test for checkPswd.js (Dir: ../public/javascripts/starter.js)
describe('foo() Function Test', function () {

    it('Test1 - foo == baz', function () {
    	expect(foo('baz')).to.be.true;
    });

    it('Test2 - foo != baz', function () {
    	expect(foo('haha')).to.be.false;
    });

    it('Test3 - foo == null', function () {
    	expect(foo('')).to.be.false;
    });
});
