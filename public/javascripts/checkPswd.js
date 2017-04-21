
function checkPswd() {
  
  var regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?*@#$%&_])[A-Za-z0-9!@#$%&*?_]{8,20}/;
  var userInput = document.getElementById('userinput'), badPass = document.getElementById('passFailed');

  if(!regex.test(userInput.value)) {
    badPass.innerHTML = 'Password must be 8 - 20 characters long and have' + 
	    ' at least one capital letter' +
	    ' at least one lowercase letter' + ' at least one digit' 
	    ' at least one special character !@#$%^&*_?';
  } else if(badPass.innerHTML) {
    badPass.innerHTML = '';
  }

}

