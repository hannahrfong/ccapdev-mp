$(document).ready(function () {
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");
    var newNum = document.getElementById("number");

    cancel.onclick = function () {
        window.location.assign('/contactnums');
    }

    newNum.onkeyup = function () {
        var patt = /[0-9]+/;

        if (newNum.value.length >= 11 && patt.test(newNum.value))
            add.disabled = false;
        else
            add.disabled = true;
    }

    add.onclick = function () {
        $.post('/updateDetails', {$addToSet:{contactNumber: newNum.value}});
        window.location.assign('/contactnums');
    }
})