function equals(str) { 
	return str == "Baz";
}

function compare() {
	var input_string = document.getElementById("userinput").value;
	document.getElementById("result").innerHTML = equals(input_string);
}