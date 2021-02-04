const form = document.getElementById('regForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const ageYes = document.getElementById('ageVerificationYes');
const ageNo = document.getElementById('ageVerificationNo');
const acceptTOS = document.getElementById('acceptTOS');

document.addEventListener('submit', (e)=> {
  e.preventDefault();
  checkInputs();
});

function checkInputs(){
    // get values from the inputs
    // trim() removes the white space
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordValue2 = password2.value.trim();
    const ageYesValue = ageYes.value;
    const ageNoValue = ageNo.value;
    const acceptTOSValue = acceptTOS.value;

    // ************************ USERNAME ************************
    // if empty
    if(usernameValue === ''){
      // show error 
      // add error class
      setErrorFor(username, 'Username cannot be blank');
    }else if (!beginsWithCharacter(usernameValue)){
      setErrorFor(username, 'Username must begin with a character')
    }else if (!threeOrMoreAlphanumeric(usernameValue)){
      setErrorFor(username, 'Username must have three or more alphanumeric characters.')
    }else {
      // add success
      setSuccessFor(username);
    }
    
    // ************************ EMAIL ************************
    if(emailValue === ''){
      // show error 
      // add error class
      setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, 'Email is not valid');
    } else {
      setSuccessFor(email);
    }
    
    // ************************ INITIAL PASSWORD ************************
    if(passwordValue === '') {
      setErrorFor(password, 'Password cannot be blank');
    } else if (!isPasswordEightChar(passwordValue)){
      setErrorFor(password, 'Password must contain at least 8 characters');
    } else if (!isPasswordOneUppercase(passwordValue)){
      setErrorFor(password, 'Password must contain at least 1 upppercase character');
    } else if (!isPasswordOneNumber(passwordValue)){
      setErrorFor(password, 'Password must contain at least 1 number');
    } else if (!isPasswordOneSpecial(passwordValue)){
      setErrorFor(password, 'Password must contain at least one of the following:(/*-+!@#$^&*)');
    } else {
      setSuccessFor(password);
    }
    
    // ************************ CONFIRM PASSWORD ************************
    if(passwordValue2 === '') {
      setErrorFor(password2, 'Confirm password cannot be blank');
    } else if (passwordValue2 !== passwordValue){
      setErrorFor(password2, 'Passwords do not match');
    } else {
      setSuccessFor(password2);
    }

    // ************************ CONFIRM AGE VERIFICATION ************************
    if (document.getElementById('ageVerificationNo').checked) {
        setErrorFor(ageNo, 'If you are younger than 13, please leave. Your IP has been logged and we will be calling your parents.');
    } else if (document.getElementById('ageVerificationYes').checked) {
        document.getElementById('ageVerificationNo').checked = false;
    }
    
}// end checkInputs();

// Regex is hard. This took me forever to play around with. I swear. 
  
function beginsWithCharacter(username){
    return /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/.test(username);
}

function threeOrMoreAlphanumeric(username){
    return /(.*[0-9]){3}/i.test(username);
}

function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPasswordEightChar(password){
    return /.{8}/.test(password);
}

function isPasswordOneUppercase(password){
    return /(?=.*[A-Z])/.test(password);
}

function isPasswordOneNumber(password){
    return /(.*[0-9]){1}/i.test(password);
}

function isPasswordOneSpecial(password){
    return /(.*[/*-+!@#$^&*]){1}/i.test(password);
}


function setErrorFor(input, message) {
const formControl = input.parentElement; // .site-content
const small = formControl.querySelector('small');

// add error message inside small
small.innerText = message;

// add error class
formControl.className = 'site-content error';
}

function setSuccessFor(input) {
const formControl = input.parentElement;
formControl.className = 'site-content success';
}
