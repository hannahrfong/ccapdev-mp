const db = require("./models/db.js");
const Product = require("./models/ProductModel.js");
const AddOn = require("./models/AddOnModel.js");
const BestSeller = require("./models/BestSellerModel.js");
const Bag = require("./models/BagModel.js");

db.connect();
AddOn.deleteMany()
.then(function(){
    return Product.deleteMany();
})
.then(function(){
    return BestSeller.deleteMany();
})
.then(function(){
    var counter = 0;
    var addOns = [
        {
            id: counter++,
            name: "Extra Corn and Carrots", 
            price: 70
        },
    
        {
            id: counter++,
            name: "Garlic Bread", 
            price: 15
        },
    
        {
            id: counter++,
            name: "Parmesan Garlic Bread", 
            price: 25
        },
    
        {
            id: counter++,
            name: "Extra Bacon Bits", 
            price: 15
        },

        {
            id: counter++,
            name: "Extra BBQ Sauce",
            price: 30
        },
    
        {
            id: counter++,
            name: "Extra Cheese", 
            price: 30
        },
    
        {
            id: counter++,
            name: "Dip", 
            price: 30,
            flavor: ["Garlic Mayo", "Honey Mustard"],
        }
    ]

    return AddOn.insertMany(addOns);
})
.then(function(){
    var garlicBread;
    var parmesanGarlicBread;
    var cornCarrots;
    var bacon;
    var cheese;
    var bbqSauce;
    var dip; 
    var nachoSmall;
    var lasagnaMed;
    var ribsSingle;
    var salmonMed;

    AddOn.findOne({name: "Garlic Bread"})
    .then(function(result){
        garlicBread = result._id;
        return AddOn.findOne({name: "Parmesan Garlic Bread"});
    })
    .then(function(result){
        parmesanGarlicBread = result._id;
        return AddOn.findOne({name: "Extra Corn and Carrots"});
    })
    .then(function(result){
        cornCarrots = result._id;
        return AddOn.findOne({name: "Extra Bacon Bits"});
    })
    .then(function(result){
        bacon = result._id;
        return AddOn.findOne({name: "Extra Cheese"});
    })
    .then(function(result){
        cheese = result._id;
        return AddOn.findOne({name: "Extra BBQ Sauce"});
    })
    .then(function(result){
        bbqSauce = result._id;
        return AddOn.findOne({name: "Dip"});
    })
    .then(function(result){
        dip = result._id;
        return insertProducts(garlicBread, parmesanGarlicBread, cornCarrots, bacon, cheese, bbqSauce, dip);
    }) 
})

function insertProducts(garlicBread, parmesanGarlicBread, cornCarrots, bacon, cheese, bbqSauce, dip){
    var lasagna = "Premium All Beef Lasagna";
    var ribs = "Smoky Baby Back Ribs";
    var salmon = "Parmesan Baked Salmon";
    var chicken = "Garlic Parmesan Wings";
    var nachoBake = "Four Cheese Nacho Bake";
    var bakedPotato = "Cheesy Bacon Baked Potatoes";
    var truffleFries = "Parmesan Truffle Fries with Dip";
    var twisterFries = "Twister Fries with Dip";
    var cookies = "Reese's Chocochip Cookies";
    var crinkles = "Chocolate Crinkles";
    var cake = "Belgian Chocolate Cake";
    var icedTea = "Houseblend Iced Tea";
    var calamansi = "Calamansi Juice";
    var mango = "Mango Juice";
    var fourSeasons = "Four Seasons Juice";
    var bday = "Birthday Combo";
    var party = "Party Combo";
    var holiday = "Holiday Combo";
    var fiesta = "Fiesta Combo";
    var s = " (Small)";
    var m = " (Medium)";
    var l = " (Large)";
    var main = "main";
    var snack = "snack"
    var dessert = "dessert";
    var drink = "drink";
    var bundle = "bundle";

    //add products
    var counter = 0;
    function getPcs(qty){
        return " (" + qty + " pcs.)";
    }

    var products = [
        //main dishes
        {
            id: counter++,
            name: lasagna + s,
            category: main,
            price: 395,
            image: '/images/products/lasagna-small.png',
            addOn: [garlicBread, parmesanGarlicBread]
        },

        {
            id: counter++,
            name: lasagna + m,
            category: main,
            price: 795,
            image: '/images/products/lasagna-medium.png',
            addOn: [garlicBread, parmesanGarlicBread]
        },

        {
            id: counter++,
            name: lasagna + l,
            category: main,
            price: 1450,
            image: '/images/products/lasagna-large.png',
            addOn: [garlicBread, parmesanGarlicBread]
        },

        {
            id: counter++,
            name: ribs + " (Half Rack)",
            category: main,
            price: 645,
            image: '/images/products/ribs-half.png',
            addOn: [cornCarrots, bbqSauce],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: ribs + " (Single Rack)",
            category: main,
            price: 1125,
            image: '/images/products/ribs-single.png',
            addOn: [cornCarrots, bbqSauce],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: ribs + " (Double Rack)",
            category: main,
            price: 2225,
            image: '/images/products/ribs-double.png',
            addOn: [cornCarrots, bbqSauce],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: salmon + m,
            category: main,
            price: 1295,
            image: '/images/products/salmon-medium.png',
            addOn: [cornCarrots],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: salmon + l,
            category: main,
            price: 2495,
            image: '/images/products/salmon-large.png',
            addOn: [cornCarrots],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: chicken + getPcs(12),
            category: main,
            price: 450,
            image: '/images/products/chicken-12.png'
        },

        {
            id: counter++,
            name: chicken + getPcs(24),
            category: main,
            price: 395,
            image: '/images/products/chicken-24.png'
        },

        //Snacks
        {
            id: counter++,
            name: nachoBake + s,
            category: snack,
            price: 395,
            image: '/images/products/nacho-small.png'
        },
        
        {
            id: counter++,
            name: nachoBake + m,
            category: snack,
            price: 790,
            image: '/images/products/nacho-medium.png'
        },

        {
            id: counter++,
            name: nachoBake + l,
            category: snack,
            price: 1150,
            image: '/images/products/nacho-large.png'
        },

        {
            id: counter++,
            name: nachoBake + "(Party)",
            category: snack,
            price: 2295,
            image: '/images/products/nacho-party.png'
        },

        {
            id: counter++,
            name: bakedPotato + s,
            category: snack,
            price: 340,
            image: '/images/products/potato-small.png',
            addOn: [bacon, cheese]
        },

        {
            id: counter++,
            name: bakedPotato + m,
            category: snack,
            price: 680,
            image: '/images/products/potato-medium.png',
            addOn: [bacon, cheese]
        },

        {
            id: counter++,
            name: bakedPotato + l,
            category: snack,
            price: 1295,
            image: '/images/products/potato-large.png',
            addOn: [bacon, cheese]
        },

        {
            id: counter++,
            name: truffleFries,
            category: snack,
            price: 495,
            image: '/images/products/truffle.png',
            addOn: [dip]
        },

        {
            id: counter++,
            name: twisterFries,
            category: snack,
            price: 495,
            image: '/images/products/twister.png',
            addOn: [dip]
        },

        //Desserts & Drinks
        {
            id: counter++,
            name: cookies + getPcs(6),
            category: dessert,
            price: 250,
            image: '/images/products/pbutter-6.png'
        },

        {
            id: counter++,
            name: cookies + getPcs(12),
            category: dessert,
            price: 480,
            image: '/images/products/pbutter-12.png'
        },

        {
            id: counter++,
            name: crinkles + getPcs(10),
            category: dessert,
            price: 250,
            image: '/images/products/crinkles-10.png'
        },


        {
            id: counter++,
            name: crinkles + getPcs(20),
            category: dessert,
            price: 480,
            image: '/images/products/crinkles-20.png'
        },

        {
            id: counter++,
            name: cake,
            category: dessert,
            price: 695,
            image: '/images/products/cake.png'
        },

        {
            id: counter++,
            name: icedTea,
            category: drink,
            price: 60,
            image: '/images/products/iced-tea.png'
        },

        {
            id: counter++,
            name: calamansi,
            category: drink,
            price: 60,
            image: '/images/products/calamansi.png'
        },

        {
            id: counter++,
            name: mango,
            category: drink,
            price: 60,
            image: '/images/products/mango.png'
        },

        {
            id: counter++,
            name: fourSeasons,
            category: drink,
            price: 60,
            image: '/images/products/four-seasons.png'
        },

        //Bundle Meals
        {
            id: counter++,
            name: bday + m,
            category: bundle,
            price: 2550,
            image: '/images/products/bday-medium.png',
            inclusion: [{productName: "Premium Medium Lasagna", quantity: 1}, 
            {productName: "Medium Baked Salmon", quantity: 1},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 12},
            {productName: "Garlic Bread", quantity: 6}]

        },

        {
            id: counter++,
            name: party + m,
            category: bundle,
            price: 1495,
            image: '/images/products/party-medium.png',
            inclusion: [{productName: "Premium Medium Lasagna", quantity: 1}, 
            {productName: "Garlic Parmesan Chicken Wings", quantity: 12},
            {productName: "Garlic Bread", quantity: 6},
            {productName: "Houseblend Iced Tea", quantity: 4}]
        },

        {
            id: counter++,
            name: holiday + m,
            category: bundle,
            price: 2450,
            image: '/images/products/holiday-medium.png',
            inclusion: [{productName: "Premium Medium Lasagna", quantity: 1}, 
            {productName: "Rack of Baby Back Ribs", quantity: 1},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 12},
            {productName: "Garlic Bread", quantity: 6}]
        },

        {
            id: counter++,
            name: fiesta + m,
            category: bundle,
            price: 3700,
            image: '/images/products/fiesta-medium.png',
            inclusion: [{productName: "Premium Medium Lasagna", quantity: 1}, 
            {productName: "Rack of Baby Back Ribs", quantity: 1},
            {productName: "Medium Baked Salmon", quantity: 1},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 12},
            {productName: "Garlic Bread", quantity: 6}]
        },

        {
            id: counter++,
            name: bday + l,
            category: bundle,
            price: 4850,
            image: '/images/products/bday-large.png',
            inclusion: [{productName: "Premium Large Lasagna", quantity: 1}, 
            {productName: "Large Baked Salmon", quantity: 1},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 24},
            {productName: "Garlic Bread", quantity: 12}]
        },

        {
            id: counter++,
            name: party + l,
            category: bundle,
            price: 2795,
            image: '/images/products/party-large.png',
            inclusion: [{productName: "Premium Large Lasagna", quantity: 1}, 
            {productName: "Garlic Parmesan Chicken Wings", quantity: 24},
            {productName: "Garlic Bread", quantity: 12},
            {productName: "Houseblend Iced Tea", quantity: 8}]
        },

        {
            id: counter++,
            name: holiday + l,
            category: bundle,
            price: 4650,
            image: '/images/products/holiday-large.png',
            inclusion: [{productName: "Premium Large Lasagna", quantity: 1}, 
            {productName: "Racks of Baby Back Ribs", quantity: 2},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 24},
            {productName: "Garlic Bread", quantity: 12}]
        },

        {
            id: counter++,
            name: fiesta + l,
            category: bundle,
            price: 7100,
            image: '/images/products/fiesta-large.png',
            inclusion: [{productName: "Premium Large Lasagna", quantity: 1}, 
            {productName: "Racks of Baby Back Ribs", quantity: 2},
            {productName: "Large Baked Salmon", quantity: 1},
            {productName: "Garlic Parmesan Chicken Wings", quantity: 24},
            {productName: "Garlic Bread", quantity: 12}]
        }
    ]
    Product.insertMany(products)
    .then(function(){
        return Product.findOne({name: "Four Cheese Nacho Bake (Small)"});
    })
    .then(function(result){
        nachoSmall = result._id;
        return Product.findOne({name: "Premium All Beef Lasagna (Medium)"});
    })
    .then(function(result){
        lasagnaMed = result._id;
        return Product.findOne({name: "Smoky Baby Rack Ribs(Single Rack)"});
    })
    .then(function(result){
        ribsSingle = result._id;
        return Product.findOne({name: "Parmesan Baked Salmon (Medium)"});
    })
    .then(function(result){
        salmonMed = result._id;
        return BestSeller.insertMany([{productId: nachoSmall}, {productId: lasagnaMed}, {productId: ribsSingle}, {productId: salmonMed}]);
    });
}


// just for testing
function deleteBags(){
    db.deleteMany(Bag, {}, function()   {

    });
}

function createBag(){
    var userId = 0;
    var orderId  = 0;   // has to not yet exist in orderModel
    var orderItems = [];

    var bag = {
        userId: userId,
        orderId: orderId,
        orderItems: orderItems
    }

    db.insertOne(Bag, bag, function()   {
    });
}

deleteBags();
createBag();

        
/*
db.deleteMany(AddOn, {}, function(){});
db.deleteMany(Product, {}, function(){});
*/ 
//add best sellers 