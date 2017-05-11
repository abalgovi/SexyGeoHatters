var userObj = require('../../routes/users.js');

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


// -------- Testing Purposes Only --------
function testPasswordScheme(val_lower, val_upper, val_num, val_len, val_special){
  
  var regexFormat = '/', regexStr = '', endRegex = '[';

  // Similar to addLength(Len) 
  function lengthSpecifier(length){
    return '{'+ length + ',30}';
  }

  regexStr += regexFormat;

  if (val_lower == 'Yes'){
    regexStr += genLowerCaseRegex();
    endRegex += 'a-z';
  }

  if (val_upper == 'Yes'){
    regexStr += genUpCaseRegex();
    endRegex += 'A-Z';
  }

  if (val_num == 'Yes'){
    regexStr += genNumsRegex();
    endRegex += '0-9';
  }

  if (val_special == 'Yes'){
    regexStr += genSpecialCharsRegex();
    endRegex += '!@#$%^&*_?';
  }

  endRegex += ']'

  regexStr += endRegex;
  regexStr += lengthSpecifier(val_len);
  regexStr += regexFormat;

  return regexStr;
}

