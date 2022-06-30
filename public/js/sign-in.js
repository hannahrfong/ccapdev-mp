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

    submit.onclick = function() {
        $.get('/checkaccount', {email: email.value, password: pw.value}, function(res) {
            if (res == "err-email")
                document.getElementById("error").innerHTML = "This account is not registered.";
            else
                if (res == "err-pw")
                    document.getElementById("error").innerHTML = "Incorrect password. Please try again.";
                else
                {
                    document.getElementById("error").innerHTML = "";
                    $("body").load('/home');
                }
        })
    };
});