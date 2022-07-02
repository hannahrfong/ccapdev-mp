$(document).ready(function(){
    var email = document.getElementById("email");
    var pw = document.getElementById("psw");
    var submit = document.getElementById("signin-submit");

    email.onkeyup = function() {
        if (email.value.length != 0 && validatePW(pw.value))
            submit.disabled = false;
        else
            submit.disabled = true;
    }

    pw.onkeyup = function () {
        if (email.value.length != 0 && validatePW(pw.value))
            submit.disabled = false;
        else
            submit.disabled = true;
    }

    function validatePW (pw) {
        var uppercaseLetters = /[A-Z]/g;
        var specialChars = /\W|_/g;
        var numbers = /[0-9]/g;
        
        return pw.match(uppercaseLetters) && pw.match(specialChars) && pw.match(numbers) && pw.length >= 8;
    }
});