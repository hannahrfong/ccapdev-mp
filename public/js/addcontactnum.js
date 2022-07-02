$(document).ready(function () {
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");
    var newNum = document.getElementById("number");

    cancel.onclick = function () {
        window.location.assign('/contactnums');
    }

    newNum.onkeyup = function () {
        if (newNum.value.length != 0)
            add.disabled = false;
        else
            add.disabled = true;
    }

    add.onclick = function () {
        $.post('/updateDetails', {$addToSet:{contactNumber: newNum.value}});
        window.location.assign('/contactnums');
    }
})