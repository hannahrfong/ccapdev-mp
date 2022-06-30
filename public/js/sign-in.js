$(document).ready(function(){
    var email = document.getElementById("email");
    var pw = document.getElementById("psw");
    var submit = document.getElementById("signin-submit");

    email.onkeyup = function() {
        if (email.value.length != 0 && pw.value.length != 0)
            submit.disabled = false;
        else
            submit.disabled = true;
    }

    pw.onkeyup = function () {
        if (email.value.length != 0 && pw.value.length != 0)
            submit.disabled = false;
        else
            submit.disabled = true;
    }
});