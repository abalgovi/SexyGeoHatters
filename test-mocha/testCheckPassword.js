var expect = chai.expect;

// Test for checkPswd.js (Dir: ../public/javascripts/checkPswd.js)
describe('checkPswd() Function Test', function () {

    it('Test1 - Valid Password', function () {
    	expect(checkPswdS('Cse112ucsd@')).to.be.true;
    });

    it('Test2 - Invalid Password', function () {
    	expect(checkPswdS('aaa')).to.be.false;
    });

    it('Test3 - Null Password Input', function () {
    	expect(checkPswdS('')).to.be.false;
    });
});
