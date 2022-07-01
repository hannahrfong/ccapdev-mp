$(document).ready(function () {
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");
    var newAdd = document.getElementById("address");

    cancel.onclick = function () {
        window.location.assign('/addresses');
    }

    newAdd.onkeyup = function () {
        if (newAdd.value.length != 0)
            add.disabled = false;
        else
            add.disabled = true;
    }

    add.onclick = function () {
        $.get('updateDetails', {$addToSet:{completeAddress: newAdd.value}});
        window.location.assign('/addresses');
    }
})