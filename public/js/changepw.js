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
        if (old.value.length != 0 && newpsw.value.length != 0 && confnew.value.length != 0)
            update.disabled = false;
        else
            update.disabled = true;
    }

    newpsw.onkeyup = function () {
        if (old.value.length != 0 && newpsw.value.length != 0 && confnew.value.length != 0 && (newpsw.value == confnew.value))
            update.disabled = false;
        else
            update.disabled = true;
    }

    confnew.onkeyup = function () {
        if (old.value.length != 0 && newpsw.value.length != 0 && confnew.value.length != 0 && (newpsw.value == confnew.value))
            update.disabled = false;
        else
            update.disabled = true;
    }
})