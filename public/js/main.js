$(document).ready(function(){
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

    $("#searchbar-input").keyup(function(){
        var keyupTimer;
        clearTimeout(keyupTimer);
        keyupTimer = setTimeout(function(){
            var q = $("#searchbar-input").val();

            if (q == "")
                window.location.href = "http://localhost:3000/menu";  

            else if(window.location.href.indexOf("search") == -1)
                window.location.href = "http://localhost:3000/search?q=" + q;

            else 
            {
                getSearchResults(q);
            }
        }, 1500);
    })

    function getSearchResults(q){
        $.get("/searchresults", {q: q}, function(html){
            $("#results-container").html(html);
            history.pushState(null, "", "?q=" + q);
        }); 
    }


});

/*
        if(window.location.href.indexOf("search") == -1){
            window.location.href = "http://localhost:3000/search";
        }

            if(window.location.href.indexOf("search") != -1)
        $("#searchbar-input").focus();
        $("#searchbar-input").on("focus", function(e){
            $("#searchbar-input").delay(13).caretToEnd();
        });
*/ 
