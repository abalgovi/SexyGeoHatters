var userObj = require('users.js');

function setPasswordScheme() {

  var regexComponents = {
                        lowercase: genLowerCaseRegex, upcase: genUpCaseRegex,
			numbs: genNumsRegex, spChars: genSpecialCharsRegex,
			length: addLength };

  // end regex contains the [a-zA-Z0-9!@#$%^&*?] options at end of regex
  var strRegex = '', endRegex = '[';
  
  // loop through regexComponents and assemble the regex one at a time
  for(let component in regexComponents) {
    
    var selection = document.getElementById(component)
    var value = selection.options[seletion.selectedIndex].text;
    
    // length is the last part of regex so append end regex
    if(component == 'length') {
      strRegex += endRegex + regexComponents[component](value,endRegex) + ']';
    } else if(value == 'Yes') {
      var newRegex = regexComponents[component]();
      endRegex += newRegex.slice(5,(component == 'spChars') ? 16 : 9);
      strRegex += newRegex;
    }
  }

  // convert string to regex obj
  regex = new RegExp(regex);


 
}


function genLowerCaseRegex() {
  return '(?=.*[a-z])';
}

function genUpCaseRegex() {
  return '(?=.*[A-Z])';
}

function genNumsRegex() {
  return '(?=.*[0-9])';
}

function addLength(len) {
  return '{len,30}';
}

function genSpecialCharsRegex() {
  return '(?=.*[!@#$%^&*_?])';
}

