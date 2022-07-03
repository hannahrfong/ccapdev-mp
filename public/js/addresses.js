$(document).ready(function() {
    var add = document.getElementById("add");
    var orig;

    $('#addresses').on('click', '.editElement', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        orig = child.innerHTML;
        var save = this.nextElementSibling;
        var input = document.createElement("input");

        input.type = "text";
        input.classList.add(child.classList);
        input.value = orig;
        p.replaceChild(input, child);

        save.classList.remove("hide");
        this.classList.add("hide");
    });

    $('#addresses').on('click', '.save', function () {
        var address = this.parentNode.previousElementSibling;
        $.post('/updateelement', {frm: "address", val: orig, newVal: address.value});

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
        window.location.assign('/addaddress');
    }

    $('#addresses').on('click', '.del', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];

        $.post('/updateDetails', {$pull:{completeAddress: child.innerHTML}}, function (res) {});
        window.location.assign('/addresses');
    });
});