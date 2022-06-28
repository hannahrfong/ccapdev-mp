$(document).ready(function(){

    $(".delete").click(function(deleteItem){
        $(".order-container").each(function(){
            
            if ($(this).hasClass($(deleteItem.target).attr("class").substr(7, 7)))
                $(this).css("display", "none");
        })

        console.log($(deleteItem.target).hasClass("1"));
        console.log(this);
    })

    const toggleButton = document.getElementById("toggle-button");
    const naviList = document.getElementById("right-text-container");
    
    toggleButton.addEventListener("click", ()=>{
        naviList.classList.toggle("active");
    })

    const icon = document.getElementById("bag-icon");
    const  bag = document.getElementById("bag-container");
    
    icon.addEventListener("click", ()=>{
        bag.classList.toggle("hide");
    })

    $("#searchbar-input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        
        //if enter key was pressed
        if(keycode == '13'){
            var search = $("#searchbar-input").val();
            window.location.href = "http://localhost:3000/search?search=" + search;
        }
    })
});
