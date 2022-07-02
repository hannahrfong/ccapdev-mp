$(document).ready(function() {
    var update = document.getElementById("update");
    var save = document.getElementById("save");
    var change = document.getElementById("changepw");
    var email;

    update.onclick = function () {
        var p = this.parentNode.parentNode;
        
        for (var  i = 0; i < p.children.length; i++)
        {
            var child = p.children[i];
            if (child.classList.contains("field"))
            {
                var fieldVal = child.children[1];
                var fieldText = fieldVal.innerHTML;
                var input = document.createElement("input");

                if (child.children[0].innerHTML == "Email")
                    input.type = "email";
                else
                    input.type = "text";

                input.name = fieldVal.id;
                input.classList.add(fieldVal.classList);
                input.value = fieldText;
                child.replaceChild(input, fieldVal);
            }
        }

        save.classList.remove("hide");
        update.classList.add("hide");
        email = document.getElementById("email");
    }

    /*save.onclick = function () {
        var first = document.getElementById("firstName");
        var last = document.getElementById("lastName");

        $.post('/updateDetails', {$set:{firstName: first.value, lastName: last.value, email: email.value}});

        var p = this.parentNode.parentNode;
    
        for (var  i = 0; i < p.children.length; i++)
        {
            var child = p.children[i];
            if (child.classList.contains("field"))
            {
                var inputField = child.children[1];
                var inputText = inputField.value;
                var para = document.createElement("p");

                para.id = inputField.id;
                para.classList.add(inputField.classList);
                para.innerHTML = inputText;
                child.replaceChild(para, inputField);
            }
        }

        save.classList.add("hide");
        update.classList.remove("hide");
    }*/

    change.onclick = function () {
        window.location.assign('/changepw');
    }
});