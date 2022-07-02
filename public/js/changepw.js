$(document).ready(function () {
    var update = document.getElementById("update");
    var cancel = document.getElementById("cancel");
    var old = document.getElementById("oldpsw");
    var newpsw = document.getElementById("newpsw");
    var confnew = document.getElementById("confnewpsw");

    cancel.onclick = function () {
        window.location.assign('/profile');
    }

    old.onkeyup = function () {
        if (validatePW(old.value) && validatePW(newpsw.value) && validatePW(confnew.value))
            update.disabled = false;
        else
            update.disabled = true;
    }

    newpsw.onkeyup = function () {
        if (validatePW(old.value) && validatePW(newpsw.value) && validatePW(confnew.value) && (newpsw.value == confnew.value))
            update.disabled = false;
        else
            update.disabled = true;
    }

    confnew.onkeyup = function () {
        if (validatePW(old.value) && validatePW(newpsw.value) && validatePW(confnew.value) && (newpsw.value == confnew.value))
            update.disabled = false;
        else
            update.disabled = true;
    }

    function validatePW (pw) {
        var uppercaseLetters = /[A-Z]/g;
        var specialChars = /\W|_/g;
        var numbers = /[0-9]/g;
        
        return pw.match(uppercaseLetters) && pw.match(specialChars) && pw.match(numbers) && pw.length >= 8;
    }
})