let masterArray = {
  array: [],
  components: [],
  add: function(input){
    this.array = this.array.concat(input.array);
    this.components.push(input);
  
  },
  clear: function(){
    this.array =[];
    this.components=[];
  }

};

class chars {
  constructor(array, label){
    this.array = array;
    this.label = label;
  }
};

class letters{
  constructor(label){
    this.array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    this.label = label;
  }
};

const lowers = new letters("Lowercase letters");
const uppers = new letters("Uppercase letters");
const nums = new chars(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], "Numbers");
const symbs = new chars(["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "`", "~", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", '"', ",", ".", "<", ">", "/", "?"], "Symbols");

let isRepeat = true;
let isRepeatAdjascent = true;



// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  masterArray.clear();
  if (!password){
    return;
  }
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Length Function
function getLength(){
  var chosenLength = prompt("Choose number of characters in password (must be between 8 and 128 characters).");
  if (chosenLength===null){
    return "cancel";
  } else if (chosenLength===""){
    return false;
  } else {
  var parsedInput = parseFloat(chosenLength)
    if (isNaN(parsedInput)){
      return false;
    } else if (!Number.isInteger(parsedInput)){
      return false;
    } else if (parsedInput<8){
      return false;
    } else if (parsedInput>128){
      return false;
    } else {
      return parsedInput;
    };
  };

};


// Character Inclusion Functions


// Character Compiler
function masterCompiler(){
  let charset = [lowers, uppers, nums, symbs];
  for (let i=0; i<charset.length; i++){
    if (confirm(charset[i].label+"?")){
      masterArray.add(charset[i]);
      window.alert(charset[i].label+" enabled.");
    } else {
      window.alert(charset[i].label+" disabled.");
    }
    
  };
  if (masterArray.components.length<1){
    window.alert("ERROR: PASSWORD MUST INCLUDE AT LEAST 1 CHARACTER TYPE.");
    masterCompiler()
  } else{
    return;
  };
  
};

function coinflip(){
  let coin = Math.floor(Math.random()*2);
  if (coin>0){
    return true;
  } else {
    return false;
  };
};

function getCharacter(word){
  let choice = masterArray.array[Math.floor(Math.random()*masterArray.array.length)];
  if (lowers.array.includes(choice)){
    if (masterArray.components.includes(uppers)&&masterArray.components.includes(lowers)){
      let outcome = coinflip()
      if (outcome){
        choice=choice.toUpperCase();
      };
    } else if (masterArray.components.includes(uppers)){
      choice=choice.toUpperCase();
    };
  };

  let repVar = repeaterCheck(word, choice);
  if (repVar){
    return choice;
  } else {
    return false;
  };
   
};


// Repeater Functions

function repeater (length){
  if (!confirm("Enable repeated characters?")){
    if (confirm("Disable repeated characters: \n Entire Password[OK] \n Only adjascent Characters[Cancel]")){
      if (length>masterArray.array.length){
        window.alert("ERROR: PASSWORD LENGTH EXCEEDS AVAILABLE CHARACTERS.");
        repeater()
      } else {
        isRepeat = false;
      };

    } else {
      isRepeatAdjascent = false;
    };
  };
  return;
};

function repeaterCheck(str, char){
  if (!isRepeat){
    if (str.includes(char)){
      return false;
    };
  } else if (!isRepeatAdjascent){
    if (str.slice(-1)===char){
      return false;
    };
  }
  return true;
  
};

function generatePassword(){
  let pword = "";
  let passwordLength = getLength();
  while (!passwordLength){
    passwordLength = getLength();
  };
  if (passwordLength==="cancel"){
     return false
  };
  
  masterCompiler();
  repeater(passwordLength);
  for (let i=0; i<passwordLength; i++) {
    let pchar = false;
    while (!pchar){
      pchar = getCharacter(pword);
    };
    pword = pword+pchar;
  }
  return pword;
};
