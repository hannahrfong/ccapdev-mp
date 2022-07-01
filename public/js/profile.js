$(document).ready(function() {
    var update = document.getElementById("update");
    var save = document.getElementById("save");

    update.onclick = function () {
        var p = this.parentNode.parentNode;
        
        for (var  i = 0; i < p.children.length; i++)
        {
            var child = p.children[i];
            if (child.classList.contains("field") && !child.classList.contains("hide"))
            {
                var fieldVal = child.children[1];
                var fieldText = fieldVal.innerHTML;
                var input = document.createElement("input");

                input.type = "text";
                input.id = fieldVal.id;
                input.classList.add(fieldVal.classList);
                input.value = fieldText;
                child.replaceChild(input, fieldVal);
            }
        }

        save.classList.remove("hide");
        update.classList.add("hide");
    }

    save.onclick = function () {
        var first = document.getElementById("firstName");
        var last = document.getElementById("lastName");
        var email = document.getElementById("email");

        $.get('/updateDetails', {firstName: first.value, lastName: last.value, email: email.value});

        var p = this.parentNode.parentNode;
    
        for (var  i = 0; i < p.children.length; i++)
        {
            var child = p.children[i];
            if (child.classList.contains("field") && !child.classList.contains("hide"))
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
    }
});