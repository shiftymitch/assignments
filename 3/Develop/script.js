// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword (length) {

  length = prompt("How long should the password be?");
  var result = "";
  var upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChar = "abcdefghijklmnopqrstuvwxyz";
  var numChar = "0123456789";
  var specialChar = "!@#$%^&*"

  
  //my first method

  // for (var i = 0; i < length; i++) {
  //   result += upperChar.charAt(Math.floor(Math.random() * upperChar.length));
  //   result += lowerChar.charAt(Math.floor(Math.random() * lowerChar.length));
  //   result += numChar.charAt(Math.floor(Math.random() * numChar.length));
  //   result += specialChar.charAt(Math.floor(Math.random() * specialChar.length));
  // }


  //my 2nd method

  for (var i = 0; i < length; i++) {
    var temp = [
      upperChar.charAt(Math.floor(Math.random() * upperChar.length)), 
      lowerChar.charAt(Math.floor(Math.random() * lowerChar.length)), 
      numChar.charAt(Math.floor(Math.random() * numChar.length)), 
      specialChar.charAt(Math.floor(Math.random() * specialChar.length))];
    
    result += temp[Math.floor(Math.random() * 4)];
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
