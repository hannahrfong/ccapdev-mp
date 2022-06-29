$(document).ready(function(){
    $("#contact-submit").click(function(){
        var subject = $("#subject").val();
        var message = $("#message").val();
        if (subject == "" && message=="")
        {
            $("#subject").css("border", "1px solid red");
            $("#message").css("border", "1px solid red");
            $("#contact-error").text("Please fill up all fields.");
        }

        else 
        {
            if (subject == "")
            {
                $("#subject").css("border", "1px solid red");
                $("#message").css("border", "1px solid lightgray");
                $("#contact-error").text("Please fill up all fields.");
            }

            else if (message == "")
            {
                $("#message").css("border", "1px solid red");
                $("#subject").css("border", "1px solid lightgray");
                $("#contact-error").text("Please fill up all fields.");
            }

            else //both are filled up
            {
                $.get("/addfeedback", {userid: 0, subject: subject, message: message}, function(flag){
                    if (flag){
                        $("#subject").css("border", "1px solid lightgray");
                        $("#message").css("border", "1px solid lightgray");
                        $("#subject").val("");
                        $("#message").val("");
                        $("#contact-error").text("");
                    }
                })
            }
        }
    })
})