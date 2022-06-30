$(document).ready(function(){

  var itemPrice = $("#price").text();
  itemPrice = itemPrice.substring(1);
  itemPrice = parseFloat(itemPrice);
  console.log('item Price: ');
  console.log(itemPrice);

  $("#addtobag").text("Add to Bag - ₱" + itemPrice);


  // price = 395;
  $("#addbtn").click(function(){
    count = parseInt($("#quantity").text());
    count++;
    $("#quantity").text(count);
  

    var countChecked =  $(".addOnOption:checked").length;
    console.log(countChecked);

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
            console.log('addOnsPrices');
            console.log(addOnsPrices);

            var sum = 0;
            for (var j = 0; j < addOnsPrices.length; j++)
            {
              sum = sum + addOnsPrices[j];
            } 
            console.log('sum');
            console.log(sum);
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
      console.log(countChecked);

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
              console.log('addOnsPrices');
              console.log(addOnsPrices);

              var sum = 0;
              for (var j = 0; j < addOnsPrices.length; j++)
              {
                sum = sum + addOnsPrices[j];
              } 
              console.log('sum');
              console.log(sum);
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
    console.log('changed');

    var countChecked =  $(".addOnOption:checked").length;
    console.log(countChecked);

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
            console.log('addOnsPrices');
            console.log(addOnsPrices);

            var sum = 0;
            for (var j = 0; j < addOnsPrices.length; j++)
            {
              sum = sum + addOnsPrices[j];
            } 
            console.log('sum');
            console.log(sum);
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

    // generate orderID
    // get product object id given name
    // get flavor
    // get add-ons
    // get quantity
    // get unit price
    // get size?
    

  });



});