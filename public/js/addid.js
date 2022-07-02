$(document).ready(function () {
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");
    var newIDType = document.getElementById("category");
    var newIDNum = document.getElementById("idnum");

    cancel.onclick = function () {
        window.location.assign('/id');
    }

    newIDNum.onkeyup = function () {
        if (newIDNum.value.length != 0)
            add.disabled = false;
        else
            add.disabled = true;
    }

    add.onclick = function () {
        if (newIDType.value == "sc")
            $.post('/updateDetails', {$addToSet:{seniorID: newIDNum.value}});
        else
            $.post('/updateDetails', {$addToSet:{pwdID: newIDNum.value}});
        
        window.location.assign('/id');
    }
})