$(document).ready(function() {
    var add = document.getElementById("add");
    var orig, save;

    $('#numbers').on('click', '.editElement', function () {
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

    $('#numbers').on('keyup', '.field-value', function () {
        var patt = /^\d+$/;

        if (patt.test(this.value) && this.value.length >= 11)
            save.disabled = false;
        else
            save.disabled = true;
    });

    $('#numbers').on('click', '.save', function () {
        var num = this.parentNode.previousElementSibling;
        $.post('/updateelement', {frm: "contact", val: orig, newVal: num.value});

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
        window.location.assign('/addnumber');
    }

    $('#numbers').on('click', '.del', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];

        $.post('/updateDetails', {$pull:{contactNumber: child.innerHTML}}, function (res) {});
        window.location.assign('/contactnums');
    });
});