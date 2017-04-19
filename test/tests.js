QUnit.test( "Testing starter.js", function(assert) {
	
	// Test 
	var test1 = "foo", foo1 = foo(test1); // Will gives true
	var test2 = "lol", foo2 = foo(test2); // False
	var test3 = "bar", foo3 = foo(test3); // False

	// Assert testings
  	assert.equal(foo1, true, "foo1 == foo");
 	assert.notEqual(foo2, true,"foo2 != foo!");
  	assert.notEqual(foo3, true,"foo3 != foo!");

});