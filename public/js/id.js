$(document).ready(function() {
    var add = document.getElementById("add");
    var orig, save;

    $('#ids').on('click', '.edit', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        orig = child.innerHTML;
        save = this.nextElementSibling;
        var input = document.createElement("input");

        input.type = "text";
        input.classList.add(child.classList);
        input.value = orig;
        p.replaceChild(input, child);

        save.classList.remove("hide");
        this.classList.add("hide");
    });

    $('#ids').on('click', '.save', function () {
        var id = this.parentNode.previousElementSibling;
        var idType = id.previousElementSibling.innerHTML;

        if (idType == "Senior Citizen")
            $.post('/updateelement', {frm: "scid", val: orig, newVal: id.value});
        else
            $.post('/updateelement', {frm: "pwdid", val: orig, newVal: id.value});

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

    add.onclick = function () {
        window.location.assign('/addid');
    }

    $('#ids').on('click', '.del', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        var idType = p.children[0].innerHTML;
        
        if (idType == "Senior Citizen")
            $.post('/updateDetails', {$pull:{seniorID: child.innerHTML}}, function (res) {});
        else
            $.post('/updateDetails', {$pull:{pwdID: child.innerHTML}}, function (res) {});

        window.location.assign('/id');
    });
});