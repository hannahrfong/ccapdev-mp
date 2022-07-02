$(document).ready(function(){

  function enableProceed()
  {
      $("#proceed").attr("href", "/checkout");
  }

  var itemPrice = $("#price").text();
  itemPrice = itemPrice.substring(1);
  itemPrice = parseFloat(itemPrice);

  $("#addtobag").text("Add to Bag - ₱" + itemPrice);

  // price = 395;
  $("#addbtn").click(function(){
    count = parseInt($("#quantity").text());
    count++;
    $("#quantity").text(count);
  

    var countChecked =  $(".addOnOption:checked").length;

    var checkboxValues = $('.addOnOption:checked').map(function() {
      return $(this).next("label").text();
    }).get();

    for (var i = 0; i < countChecked; i++)
    {
      checkboxValues[i] = $.trim(checkboxValues[i]);
    }

    var addOnsPrices = [];

    var itemQuantity = $("#quantity").text();
    itemQuantity = parseFloat(itemQuantity);
     
    
    var itemPrice = $("#price").text();
    itemPrice = itemPrice.substring(1);
    itemPrice = parseFloat(itemPrice);

    if (checkboxValues.length > 0)
    {
        for (var i = 0; i < checkboxValues.length; i++)
        {
          var name = checkboxValues[i];
          $.get('/getAddOn', {name: name}, function(result)  {
            addOnsPrices.push(result.price);

            var sum = 0;
            for (var j = 0; j < addOnsPrices.length; j++)
            {
              sum = sum + addOnsPrices[j];
            } 
            var totalPrice = itemQuantity * (itemPrice + sum);

            $("#addtobag").text("Add to Bag - ₱" + totalPrice);


          }); 
        }
    }
    else
    {
      var totalPrice = itemQuantity * itemPrice;

      $("#addtobag").text("Add to Bag - ₱" + totalPrice);
    }

    var totalPrice = itemQuantity * itemPrice;

    $("#addtobag").text("Add to Bag - ₱" + totalPrice);
  });

  $("#subtractbtn").click(function(){
    count = parseInt($("#quantity").text());
    if (count > 1)
    {
      count--;
      $("#quantity").text(count);
      
      var countChecked =  $(".addOnOption:checked").length;

      var checkboxValues = $('.addOnOption:checked').map(function() {
        return $(this).next("label").text();
      }).get();

      for (var i = 0; i < countChecked; i++)
      {
        checkboxValues[i] = $.trim(checkboxValues[i]);
      }

      var addOnsPrices = [];

      var itemQuantity = $("#quantity").text();
      itemQuantity = parseFloat(itemQuantity);
      
      
      var itemPrice = $("#price").text();
      itemPrice = itemPrice.substring(1);
      itemPrice = parseFloat(itemPrice);

      if (checkboxValues.length > 0)
      {
          for (var i = 0; i < checkboxValues.length; i++)
          {
            var name = checkboxValues[i];
            $.get('/getAddOn', {name: name}, function(result)  {
              addOnsPrices.push(result.price);

              var sum = 0;
              for (var j = 0; j < addOnsPrices.length; j++)
              {
                sum = sum + addOnsPrices[j];
              } 
              var totalPrice = itemQuantity * (itemPrice + sum);

              $("#addtobag").text("Add to Bag - ₱" + totalPrice);
              

            }); 
          }
      }
      else
      {
        var totalPrice = itemQuantity * itemPrice;

        $("#addtobag").text("Add to Bag - ₱" + totalPrice);
      }

      var totalPrice = itemQuantity * itemPrice;

      $("#addtobag").text("Add to Bag - ₱" + totalPrice);
    }
      
  });

  $(".addOnOption").change(function()  {

    var countChecked =  $(".addOnOption:checked").length;
    

    var checkboxValues = $('.addOnOption:checked').map(function() {
      return $(this).next("label").text();
    }).get();

    for (var i = 0; i < countChecked; i++)
    {
      checkboxValues[i] = $.trim(checkboxValues[i]);
    }

    var addOnsPrices = [];

    var itemQuantity = $("#quantity").text();
    itemQuantity = parseFloat(itemQuantity);
     
    
    var itemPrice = $("#price").text();
    itemPrice = itemPrice.substring(1);
    itemPrice = parseFloat(itemPrice);

    if (checkboxValues.length > 0)
    {
        for (var i = 0; i < checkboxValues.length; i++)
        {
          var name = checkboxValues[i];
          $.get('/getAddOn', {name: name}, function(result)  {
            addOnsPrices.push(result.price);

            var sum = 0;
            for (var j = 0; j < addOnsPrices.length; j++)
            {
              sum = sum + addOnsPrices[j];
            } 
            var totalPrice = itemQuantity * (itemPrice + sum);

            $("#addtobag").text("Add to Bag - ₱" + totalPrice);


          }); 
        }
    }
    else
    {
      var totalPrice = itemQuantity * itemPrice;

      $("#addtobag").text("Add to Bag - ₱" + totalPrice);
    }
 
  });

  $("#addtobag").click(function(){

    console.log('add to bag is clicked');

    var itemQuantity = $("#quantity").text();
    itemQuantity = parseFloat(itemQuantity);

    var tPrice = $("#addtobag").text();
    tPrice = tPrice.substring(14);
    tPrice = parseFloat(tPrice);

    var productName = $("#productName").text();

    var countChecked =  $(".addOnOption:checked").length;

    var checkboxValues = $('.addOnOption:checked').map(function() {
      return $(this).next("label").text();
    }).get();

    for (var i = 0; i < countChecked; i++)
    {
      checkboxValues[i] = $.trim(checkboxValues[i]);
    }

    var addOnsList = [];
  
    if (checkboxValues.length > 0)
    {
        var num = 0;
        for (var i = 0; i < checkboxValues.length; i++)
        {
          var addOnName = checkboxValues[i];
          
          $.get('/getAddOn', {name: addOnName}, function(result)  {
            addOnsList.push(result);
          
          
            if (num == checkboxValues.length - 1)
            {
              
              $.get('/getProduct', {name: productName}, function(res)  {


                $.get('/getBag', {} , function(newRes) {

                  $.get('/getAllOrderItems', function(allOrderItems)  {

                    var orderItemId = allOrderItems.length;
                    var addOns = addOnsList;
                    var quantity = itemQuantity;
                    var totalPrice = tPrice;
                    var product = res._id;
                  
                    
                    var query = {
                      orderItemId: orderItemId,
                      product: product,
                      addOns: addOns,
                      quantity: quantity,
                      totalPrice: totalPrice,
                    };
                    
                    
                    $.get('/addOrderItem', query, function() {});
                    console.log('order item is added');
                  
                    $.get('/getOrderItem', {orderItemId: orderItemId}, function (curOrderItem)  {

                      console.log('get order item');

                      var orderItems = newRes.orderItems;
                      console.log(orderItems);
                      orderItems.push(curOrderItem._id);
                      var _id = newRes._id;
                      $.get('/updateBagItems', {_id: _id, orderItems: orderItems}, function() {

                        console.log('update bag items');

                      });
                    });

                    console.log('after bag update');
                    
                    window.location.assign('/menu');                    

                  });
  
                });
              
              });
            }
            num += 1;
            
                
          }); 
        }
    }
    else
    {
      $.get('/getProduct', {name: productName}, function(res)  {


        $.get('/getBag', {}, function(newRes) {

          $.get('/getAllOrderItems', function(allOrderItems)  {

            var orderItemId = allOrderItems.length;
            var addOns = addOnsList;
            var quantity = itemQuantity;
            var totalPrice = tPrice;
            var product = res._id;
          
            
            var query = {
              orderItemId: orderItemId,
              product: product,
              addOns: addOns,
              quantity: quantity,
              totalPrice: totalPrice,
            };
            
            
            $.get('/addOrderItem', query, function() {});
          
            $.get('/getOrderItem', {orderItemId: orderItemId}, function (curOrderItem)  {
              var orderItems = newRes.orderItems;
              orderItems.push(curOrderItem._id);
              var _id = newRes._id;
              $.get('/updateBagItems', {_id: _id, orderItems: orderItems}, function() {});
            });
            
            window.location.assign('/menu');                    


      /*
      $.get('/getBag', {userId: userId}, function(newRes) {

        $.get('/getAllOrderItems', function(allOrderItems)  {

          var orderItemId = allOrderItems.length;
          var addOns = addOnsList;
          var quantity = itemQuantity;
          var totalPrice = tPrice;
          var product = res._id;
        
          
          var query = {
            orderItemId: orderItemId,
            product: product,
            addOns: addOns,
            quantity: quantity,
            totalPrice: totalPrice,
          };
          
          
          $.get('/addOrderItem', query, function() {});
        
          $.get('/getOrderItem', {orderItemId: orderItemId}, function (curOrderItem)  {
            var orderItems = newRes.orderItems;
            orderItems.push(curOrderItem._id);
            var _id = newRes._id;
            $.get('/updateBagItems', {_id: _id, orderItems: orderItems}, function() {});
            $.get('/updateBagView', {})
            */
          });
         
        });
     
      });
      
    }
    enableProceed();
  });
});