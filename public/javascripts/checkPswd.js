
function checkPswd() {
 
  // replace this regex with the one you retrieve from the db
  var regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?*@#$%&_])[A-Za-z0-9!@#$%&*?_]{8,20}/;
  var userInput = document.getElementById('password'), badPass = document.getElementById('passFailed');
  
  // persist the data
  usrObj.insertUser({username: 'admin', password: 'sexygeohatters'});

  if(!regex.test(userInput.value)) {
    badPass.innerHTML = 'Password must be 8 - 20 characters long and have' + 
	    ' at least one capital letter' +
	    ' at least one lowercase letter' + ' at least one digit' 
	    ' at least one special character !@#$%^&*_?';
  } else if(badPass.innerHTML) {
    badPass.innerHTML = '';
  }

}

