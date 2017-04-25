var expect = chai.expect;

// Test for checkPswd.js (Dir: ../public/javascripts/checkPswd.js)
describe('checkPswd() Function Test', function () {

    it('Test1: Valid Password', function () {
    	expect(checkPswdS('Cse112ucsd@')).to.be.true;
    });

    it('Test2: Invalid Password', function () {
    	expect(checkPswdS('aaa')).to.be.false;
    });

    it('Test3: Null Password Input', function () {
    	expect(checkPswdS('')).to.be.false;
    });    
});


// Test for passScheme.js (Dir: ../public/javascripts/passScheme.js)
describe('setPasswordScheme() Function Test', function () {

    it('Test1: Password Scheme: Lower, Upper, 8-30, Special', function () {
    	expect(testPasswordScheme('Yes', 'Yes', 'No', 8, 'Yes')).to.equal('/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_?])[a-zA-Z!@#$%^&*_?]{8,30}/');
    });

    it('Test2: Password Scheme: Lower, Upper, Number, 15-30', function () {
        expect(testPasswordScheme('Yes', 'Yes', 'Yes', 15, 'No')).to.equal('/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{15,30}/');
    });

    it('Test3: Password Scheme: Lower, Upper, Number, 7-30, Special', function () {
        expect(testPasswordScheme('Yes', 'Yes', 'Yes', 7, 'Yes')).to.equal('/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?])[a-zA-Z0-9!@#$%^&*_?]{7,30}/');
    });

});


