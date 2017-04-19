QUnit.test( "Testing starter.js", function(assert) {

	// Test 
	var test1 = "Baz", foo1 = equals(test1); // Will gives true
	var test2 = "lol", foo2 = equals(test2); // False
	var test3 = "bar", foo3 = equals(test3); // False

	// Assert testings
	assert.equal(foo1, true, "foo1 == Baz");
	assert.notEqual(foo2, true,"foo2 != baz!");
	assert.notEqual(foo3, true,"foo3 != baz!");
});