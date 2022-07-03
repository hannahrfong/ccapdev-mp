$(document).ready(function() {
    var add = document.getElementById("add");
    var save;

    $('#ids').on('click', '.editElement', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        var fieldText = child.innerHTML;
        save = this.nextElementSibling;
        var input = document.createElement("input");

        input.type = "text";
        input.classList.add(child.classList);
        input.value = fieldText;
        p.replaceChild(input, child);

        save.classList.remove("hide");
        this.classList.add("hide");
    });

    $('#ids').on('keyup', '.field-value', function () {
        if (this.value.length == 0)
            save.disabled = true;
        else
            save.disabled = false;
    });

    $('#ids').on('click', '.save', function () {
        var id = this.parentNode.previousElementSibling;
        var idType = id.previousElementSibling.innerHTML;

        if (idType == "Senior Citizen")
            $.post('/updateDetails', {seniorID: id.value});
        else
            $.post('/updateDetails', {pwdID: id.value});

        var p = this.parentNode.parentNode;
        var child = p.children[1];
        var edit = this.previousElementSibling;
        var fieldText = child.value;
        var para = document.createElement("p");

        para.id = child.id;
        para.classList.add(child.classList);
        para.innerHTML = fieldText;
        p.replaceChild(para, child);

        this.classList.add("hide");
        edit.classList.remove("hide");
    });

    $('#ids').on('click', '.del', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        var idType = p.children[0].innerHTML;
        
        if (idType == "Senior Citizen")
            $.post('/updateDetails', {seniorID: ""}, function (res) {});
        else
            $.post('/updateDetails', {pwdID: ""}, function (res) {});

        child.innerHTML = "";
    });
});