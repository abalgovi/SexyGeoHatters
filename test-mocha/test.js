var expect = chai.expect;  // Testing on browser


// Test for foo function in starter.js (Directory: ../starter.js)
describe('Foo Function Test', function () {
	it('Test1 - True when equal baz', function () {
		expect(foo('baz')).to.be.true;
	});

	it('Test2 - False when != baz', function () {
		expect(foo('bar')).to.be.false;
	});

	it('Test3 - Check if boolean returned', function () {
		expect(foo('bar')).to.be.a('boolean');
	});

	it('Test4 - False if null is input', function () {
		expect(foo(null)).to.be.false;
	});
});


