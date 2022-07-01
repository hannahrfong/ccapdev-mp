$(document).ready(function(){
    //plus button
    $("#plus-bag").click(function(){
        console.log("PLUS CLICKED");
    })
    //minus button
    $("#minus-bag").click(function(){
        console.log("MINUS CLICKED");
    })
    //edit button
    $("#edit-bag").click(function(){
        
    })

    //delete button
    $("#delete-bag").click(function(){
        console.log("DELETE CLICKED");
    })

/*
    $(".delete").click(function(deleteItem){
        $(".order-container").each(function(){
            
            if ($(this).hasClass($(deleteItem.target).attr("class").substr(7, 7)))
                $(this).css("display", "none");
        })

        console.log($(deleteItem.target).hasClass("1"));
        console.log(this);
    })
*/
})