$(document).ready(function(){
    function enableProceed()
    {
        $("#proceed").attr("href", "/checkout");
    } 

    function disableProceed()
    {
        $("#proceed").removeAttr("href");
    }
    
    $.get("/getItemQuantity", {}, function(result){
    var itemQuantity = parseInt(result);

    if (itemQuantity == 0) 
        disableProceed();

    else 
        enableProceed();
    })

    //plus button
    $(".plus").click(function(){
        var clickedBtn = $(this);
        var orderItemId = $(this).parent().parent().attr("id");

        $.get("/addQuantity", {orderItemId: orderItemId}, function(result){
            var newQuantity = result.newQuantity;
            var newTotalPrice = parseFloat(result.newTotalPrice).toFixed(2);
            var newSubtotal =  parseFloat(result.newSubtotal).toFixed(2);
            var newTotal = parseFloat(result.newTotal).toFixed(2);   
            var deliveryFee = parseFloat(result.deliveryFee).toFixed(2);
            
            $(clickedBtn).siblings(".quantity").text(newQuantity);
            $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subtotal").text("₱ " + newSubtotal);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".deliveryFee").text("₱ " + deliveryFee);
            $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + newTotal);          
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
                var newTotalPrice = parseFloat(result.newTotalPrice).toFixed(2);
                var newSubtotal =  parseFloat(result.newSubtotal).toFixed(2);
                var newTotal = parseFloat(result.newTotal).toFixed(2);   
                var deliveryFee = parseFloat(result.deliveryFee).toFixed(2);

                $(clickedBtn).siblings(".quantity").text(newQuantity);
                $(clickedBtn).parent().siblings(".price-container").text("₱ " + newTotalPrice);
                $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".subtotal").text("₱ " + newSubtotal);
                $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".deliveryFee").text("₱ " + deliveryFee);
                $(clickedBtn).parent().parent().parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + newTotal);          
            } 
        })       
    })


    //edit button
    $(".edit-bag").click(function(){
        
    })


    //delete button
    $(".delete").click(function(){
        var orderItemId = $(this).parent().parent().attr("id");
        var orderContainer = $(this).parent().parent();

        $.get("/deleteOrderItem", {orderItemId: orderItemId}, function(result){

            $(orderContainer).parent().parent().siblings(".payment-container").find(".subtotal").text("₱ " + result.newSubtotal);
            $(orderContainer).parent().parent().siblings(".payment-container").find(".deliveryFee").text("₱ " + result.deliveryFee);
            $(orderContainer).parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + result.newTotal); 
        
            $(orderContainer).remove();  
            if (result.newTotal == 0)
                disableProceed();        
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

/*
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
*/
})