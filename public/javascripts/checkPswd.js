
// Original function 
function checkPswd() {
 
  // replace this regex with the one you retrieve from the db
  var regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?*@#$%&_])[A-Za-z0-9!@#$%&*?_]{8,20}/;
  var userInput = document.getElementById('password'), badPass = document.getElementById('passFailed');
  
  // persist the data
  usrObj.insertUser({username: 'admin', password: 'sexygeohatters'});

  if(!regex.test(userInput.value)) {
    badPass.innerHTML = 'Password must be 8 - 20 characters long and have' + 
	    ' at least one capital letter' +
	    ' at least one lowercase letter' + ' at least one digit' +
	    ' at least one special character !@#$%^&*_?';
  } else if(badPass.innerHTML) {
    badPass.innerHTML = '';
  }
}


// ------- Testing purposes only -------
function checkPswdS(pass) {

  function checkLength(pw){
    var len = pw.length;
    if (len < 8 || len > 20)
      return false; 
  }
  function checkLower(pw){
    if (!pw.match(".*[a-z].*"))
      return false;
  }
  function checkUpper(pw){
     if (!pw.match(".*[A-Z].*"))
      return false;
  }
  function checkNumber(pw){
    if (!pw.match(".*\\d.*"))
      return false;
  }
  function checkSymbol(pw){
    if (!pw.match(".*[!@#$%&*?_].*"))
      return false;
  }

  if(checkLength(pass) == false || checkLower(pass) == false || checkUpper(pass) == false || 
    checkNumber(pass) == false || checkSymbol(pass) == false)
    return false;

  return true;
}