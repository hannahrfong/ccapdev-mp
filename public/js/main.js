$(document).ready(function(){
    const toggleButton = document.getElementById("toggle-button");
    const naviList = document.getElementById("right-text-container");
    
    toggleButton.addEventListener("click", ()=>{
        naviList.classList.toggle("active");
    })

    const icon = document.getElementById("bag-icon");
    const  bag = document.getElementById("bag-container");
    
    $("#bag-icon").on("click", ()=>{
        bag.classList.toggle("hide");
    })

    $("#searchbar-input").keyup(function(){
        var keyupTimer;
        clearTimeout(keyupTimer);
        keyupTimer = setTimeout(function(){
            var q = $("#searchbar-input").val();

            if (q == "")
                window.location.href = "http://localhost:3000/menu";  

            else
                window.location.href = "http://localhost:3000/search?q=" + q;
        }, 1500);
    })
});