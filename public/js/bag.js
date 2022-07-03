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
        var _id = $(this).parent().parent().attr("id");

        $.post("/addQuantity", {_id: _id}, function(result){
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
        var _id = $(this).parent().parent().attr("id");

        $.post("/subtractQuantity", {_id: _id}, function(result){

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

    //delete button
    $(".delete").click(function(){
        var _id = $(this).parent().parent().attr("id");
        var orderContainer = $(this).parent().parent();

        $.post("/deleteOrderItem", {_id: _id}, function(result){

            $(orderContainer).parent().parent().siblings(".payment-container").find(".subtotal").text("₱ " + parseFloat(result.newSubtotal).toFixed(2));
            $(orderContainer).parent().parent().siblings(".payment-container").find(".deliveryFee").text("₱ " + parseFloat(result.deliveryFee).toFixed(2));
            $(orderContainer).parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + parseFloat(result.newTotal).toFixed(2)); 
        
            $(orderContainer).remove();  
            if (result.newTotal == 0)
                disableProceed();        
        });
    })

    $(".edit").click(function(){
        var _id = $(this).parent().parent().attr("id");
        var orderContainer = $(this).parent().parent();

        $.post('/deleteOrderItem', {_id: _id}, function(result){
            
            $(orderContainer).parent().parent().siblings(".payment-container").find(".subtotal").text("₱ " + parseFloat(result.newSubtotal).toFixed(2));
            $(orderContainer).parent().parent().siblings(".payment-container").find(".deliveryFee").text("₱ " + parseFloat(result.deliveryFee).toFixed(2));
            $(orderContainer).parent().parent().siblings(".payment-container").find(".overallTotal").text("₱ " + parseFloat(result.newTotal).toFixed(2)); 
        
            $(orderContainer).remove();  
            if (result.newTotal == 0)
                disableProceed();        
            console.log("RESULT PRODUCT ID: " + result.productId);
            window.location.href = "http://localhost:3000/addtobag/" + result.productId;

        })
    })
})