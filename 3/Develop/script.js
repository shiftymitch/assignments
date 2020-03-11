// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword (length) {

  //user input password length
  length = prompt("How long should the password be? (Min: 8, Max: 128)");
  if (length<8 || length>128) {
    return "Invalid length, try again.";
  } 

  //init variables
  var result = "";
  var upper = "";
  var lower = "";
  var num = "";
  var special = "";

  //user input criteria
  var includeUpper = confirm("Include uppercase letters?");
  var includeLower = confirm("Include lowercase letters?");
  var includeNum = confirm("Include numbers?");
  var includeSpecial = confirm("Include special characters?");

  //give input values
  if (includeUpper === true) {
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } 

  if (includeLower === true) {
    lower = "abcdefghijklmnopqrstuvwxyz";
  } 

  if (includeNum === true) {
    num = "0123456789";
  } 

  if (includeSpecial === true) {
    special = "!@#$%^&*";
  } 

  //check if all are null
  if (upper === "" && lower === "" && num === "" && special === "") {
    return "Must include some type of characters, try again.";
  }

  //randomizer variable
  for (var i = 0; result.length < length; i++) {
    var temp = [
      upper.charAt(Math.floor(Math.random() * upper.length)), 
      lower.charAt(Math.floor(Math.random() * lower.length)), 
      num.charAt(Math.floor(Math.random() * num.length)), 
      special.charAt(Math.floor(Math.random() * special.length))
    ];
    
    result += temp[Math.floor(Math.random() * temp.length)];
  }

  return result;

}



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
