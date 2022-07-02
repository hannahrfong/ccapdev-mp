$(document).ready(function(){
    //plus button
    $(".plus").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");

        $.get("/addQuantity", {orderItemId: orderItemId}, function(result){
           var newQuantity = result.newQuantity;
           var newTotalPrice = parseFloat(result.newTotalPrice);
           var curSubTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("subTotal").text().substring(2));
            var curOverallTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("overallTotal").text().substring(2));
            var newSubTotal =  curSubTotal - result.oldPrice + newTotalPrice;
            var newOverallTotal = newSubTotal + 50;
            $(clickedBtn).siblings(".quantity").text(newQuantity);
            $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("subTotal").text(newSubTotal);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("overallTotal").text(newOverallTotal);
        })
    })
    //minus button
    $(".minus").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");

        $.get("/subtractQuantity", {orderItemId: orderItemId}, function(result){
            var newQuantity = result.newQuantity;
            var newTotalPrice = parseFloat(result.newTotalPrice);
            var curSubTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("subTotal").text().substring(2));
             var curOverallTotal = parseFloat($(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("overallTotal").text().substring(2));
             var newSubTotal =  curSubTotal - result.oldPrice + newTotalPrice;
             var newOverallTotal = newSubTotal + 50;
             $(clickedBtn).siblings(".quantity").text(newQuantity);
             $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
             $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("subTotal").text(newSubTotal);
             $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find("overallTotal").text(newOverallTotal);
         })

        console.log("MINUS CLICKED");
    })
    //edit button
    $(".edit-bag").click(function(){
        
    })

    //delete button
    $(".delete-bag").click(function(){
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