$(document).ready(function() {
    var add = document.getElementById("add");

    $('#addresses').on('click', '.edit', function () {
        var p = this.parentNode.parentNode;
        var child = p.children[1];
        var fieldText = child.innerHTML;
        var save = this.nextElementSibling;
        var input = document.createElement("input");

        input.type = "text";
        input.id = child.id;
        input.classList.add(child.classList);
        input.value = fieldText;
        p.replaceChild(input, child);

        save.classList.remove("hide");
        this.classList.add("hide");
    });

    $('#addresses').on('click', '.save', function () {
        var address = document.getElementById("address");

        $.get('/updateDetails', {$set:{completeAddress: address.value}});

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

        $.get('/updateDetails', {$pull:{completeAddress: child.innerHTML}}, function (res) {});
        window.location.assign('/addresses');
    });
});