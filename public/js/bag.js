    
    $(document).ready(function(){

        $(".delete").click(function(deleteItem){
            $(".order-container").each(function(){
                
                if ($(this).hasClass($(deleteItem.target).attr("class").substr(7, 7)))
                    $(this).css("display", "none");
            })

            console.log($(deleteItem.target).hasClass("1"));
            console.log(this);
        })
    });
