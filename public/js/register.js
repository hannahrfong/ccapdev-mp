$(document).ready(function(){
    var input = document.getElementById("psw");
    var length = document.getElementById("length");
    var uppercase = document.getElementById("uppercase");
    var special = document.getElementById("special");
    var number = document.getElementById("number");

    var input2 = document.getElementById("confirmpsw");
    var match = document.getElementById("match");

    input.onkeyup = function() {
        // Check length
        if(input.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        }
        else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }

        // Check uppercase
        var uppercaseLetters = /[A-Z]/g;
        if(input.value.match(uppercaseLetters)) {  
            uppercase.classList.remove("invalid");
            uppercase.classList.add("valid");
        }
        else {
            uppercase.classList.remove("valid");
            uppercase.classList.add("invalid");
        }

        // Check special character
        var specialChars = /\W|_/g;
        if(input.value.match(specialChars)) {  
            special.classList.remove("invalid");
            special.classList.add("valid");
        }
        else {
            special.classList.remove("valid");
            special.classList.add("invalid");
        }

        // Check number
        var numbers = /[0-9]/g;
        if(input.value.match(numbers)) {  
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
    }

    input2.onkeyup = function() {
        if (input.value == input2.value) {
            match.classList.remove("invalid");
            match.classList.add("valid");
            document.getElementById("reg-submit").disabled = false;
        }
        else {
            match.classList.remove("valid");
            match.classList.add("invalid");
            document.getElementById("reg-submit").disabled = true;
        }
    }
});