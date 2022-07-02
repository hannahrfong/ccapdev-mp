$(document).ready(function(){

    $.get("/getItemQuantity", {}, function(result){
        
    })

    //plus button
    $(".plus").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");

        $.get("/addQuantity", {orderItemId: orderItemId}, function(result){
           var newQuantity = result.newQuantity;
           var newTotalPrice = parseFloat(result.newTotalPrice);
           var curSubTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subTotal").text().substring(2));
            var curOverallTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text().substring(2));
            var newSubTotal =  curSubTotal - result.oldPrice + newTotalPrice;
            var newOverallTotal = newSubTotal + 50;

            console.log("BAGJS curSubTotal: *" + curSubTotal + "*");
            console.log("BAGJS curOverallTotal: *" + curOverallTotal + "*");
            
            console.log("BAGJS newSubTotal: " + newSubTotal);
            console.log("BAGJS newOverallTotal: " + newOverallTotal);

            $(clickedBtn).siblings(".quantity").text(newQuantity);
            $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subTotal").text("₱ " + newSubTotal);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + newOverallTotal);
        })
    })

    //minus button
    $(".minus").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");

        $.get("/subtractQuantity", {orderItemId: orderItemId}, function(result){

            if (result)
            {
                var newQuantity = result.newQuantity;
                var newTotalPrice = parseFloat(result.newTotalPrice);
                var curSubTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subTotal").text().substring(2));
                var curOverallTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text().substring(2));
                var newSubTotal =  curSubTotal - result.oldPrice + newTotalPrice;
                var newOverallTotal = newSubTotal + 50;

                console.log("BAGJS curSubTotal: *" + curSubTotal + "*");
                console.log("BAGJS curOverallTotal: *" + curOverallTotal + "*");
                
                console.log("BAGJS newSubTotal: " + newSubTotal);
                console.log("BAGJS newOverallTotal: " + newOverallTotal);

                $(clickedBtn).siblings(".quantity").text(newQuantity);
                $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
                $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subTotal").text("₱ " + newSubTotal);
                $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + newOverallTotal);
            } 
        })       
    })


    //edit button
    $(".edit-bag").click(function(){
        
    })


    //delete button
    $(".delete").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");
        var orderContainer = $(this).parent().parent();

        $.get("/deleteOrderItem", {orderItemId: orderItemId}, function(flag){
            if (flag)
            {
                $(orderContainer).remove();
                console.log("PLEASE REMOVE THE CONTAINER");         
            }

        });
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