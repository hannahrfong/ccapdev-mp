$(document).ready(function(){
    
    var seniorInputText = $("#seniorInput").val();
    seniorInputText = $.trim(seniorInputText);

    var pwdInputText = $("#pwdInput").val();
    pwdInputText = $.trim(pwdInputText);

    var finalTotal = $("#finalTotal").text();
    finalTotal = parseFloat(finalTotal);

    
    var discount = finalTotal * 0.2;
    discount = discount.toFixed(2);

    if(seniorInputText == "" && pwdInputText == "")
    {
        if($("#discountText").length > 0 && $("#discountValue").length > 0) {

            var disc = $("#discountValue").text();
            disc = disc.substring(4);
            disc = parseFloat(disc);

            var oldFinalTotal = finalTotal + disc;
            
            oldFinalTotal = oldFinalTotal.toFixed(2);

            $("#finalTotal").text("₱" + oldFinalTotal);

            $("#discountText").remove();
            $("#discountValue").remove();
        }
    }
    else
    {
       
        if($("#discountText").length == 0 && $("#discountValue").length == 0) {
            
            $("#discount").append(  '<div class="col text-start" id="discountText">' +
                                    '<p style="color: red">Discount</p>' +
                                    '</div>' +
                                    '<div class="col text-end" id="discountValue">' +
                                    '<p style="font-weight:bold; color: red"> - ₱' + discount + '</p>' +
                                    '</div>'    );

            
            var newFinalTotal = finalTotal - discount;
            newFinalTotal = newFinalTotal.toFixed(2);
         
            $("#finalTotal").text(newFinalTotal);
            
        }
        
    }


    $("#codRadio").prop('checked', true);

    if( $('#codRadio').is(':checked') ){

        $("#codInput").prop('required', true);
        $(".cardInput").prop('required', false);

        $(".cardInput").prop('disabled', true);
        $("#codInput").prop('disabled', false);
    }
    else if ( $('#cardRadio').is(':checked') )
    {
        
        $("#codInput").prop('required', false);
        $(".cardInput").prop('required', true);

        $(".cardInput").prop('disabled', false);
        $("#codInput").prop('disabled', true);
    }

    var totalVal = $("#finalTotal").text();
    totalVal = parseFloat(totalVal);

    $('.price').each(function() {
        var priceText = $(this).text();
        priceText = parseFloat(priceText);
        priceText = priceText.toFixed(2);
        $(this).text("₱" + priceText);
    });

    $("#codInput").keyup( function() {
        var changeForVal = $(this).val();
        changeForVal = parseFloat(changeForVal);

        if ($('#codRadio').is(':checked') && changeForVal < totalVal)
        {
            $("#placeorder").prop('disabled', true);
        }
        else
        {
            $("#placeorder").prop('disabled', false);
        }

    });



    $(".paymentOption").change(function()   {

        if( $('#codRadio').is(':checked') ){
            $("#codInput").prop('required', true);
            $(".cardInput").prop('required', false);

            $(".cardInput").prop('disabled', true);
            $("#codInput").prop('disabled', false);

            $(".cardInput").val("");
    
        }
        else if ( $('#cardRadio').is(':checked') )
        {
            $("#placeorder").prop('disabled', false);
            
            $("#codInput").prop('required', false);
            $(".cardInput").prop('required', true);

            $(".cardInput").prop('disabled', false);
            $("#codInput").prop('disabled', true);

            $("#codInput").val("");
        }
    });

    $(".discountID").keyup(function()  {

        var seniorInputText = $("#seniorInput").val();
        seniorInputText = $.trim(seniorInputText);

        var pwdInputText = $("#pwdInput").val();
        pwdInputText = $.trim(pwdInputText);

        var finalTotal = $("#finalTotal").text();
        finalTotal = finalTotal.substring(1);
        finalTotal = parseFloat(finalTotal);

        
        var discount = finalTotal * 0.2;
        discount = discount.toFixed(2);

        if(seniorInputText == "" && pwdInputText == "")
        {
            if($("#discountText").length > 0 && $("#discountValue").length > 0) {

                var disc = $("#discountValue").text();
                disc = disc.substring(4);
                disc = parseFloat(disc);

                var oldFinalTotal = finalTotal + disc;
                
                oldFinalTotal = oldFinalTotal.toFixed(2);

                $("#finalTotal").text("₱" + oldFinalTotal);

                $("#discountText").remove();
                $("#discountValue").remove();
            }
        }
        else
        {
            if($("#discountText").length == 0 && $("#discountValue").length == 0) {
                $("#discount").append(  '<div class="col text-start" id="discountText">' +
                                        '<p style="color: red">Discount</p>' +
                                        '</div>' +
                                        '<div class="col text-end" id="discountValue">' +
                                        '<p style="font-weight:bold; color: red" class="price" > - ₱' + discount + '</p>' +
                                        '</div>'    );


                var newFinalTotal = finalTotal - discount;
                newFinalTotal = newFinalTotal.toFixed(2);

                $("#finalTotal").text("₱" + newFinalTotal);
            }
            
        }
    });

    
});