const db = require("./models/db.js");
const Product = require("./models/ProductModel.js");
const AddOn = require("./models/AddOnModel.js");
const BestSeller = require("./models/BestSellerModel.js");
const Bag = require("./models/BagModel.js");
const Account = require("./models/AccountModel.js");
const Feedback = require("./models/FeedbackModel.js");
const bcrypt = require("bcrypt");
const OrderItem = require("./models/OrderItemModel.js");
const Order = require("./models/OrderModel.js");

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
            name: "Honey Mustard Dip", 
            price: 30
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
        return AddOn.findOne({name: "Honey Mustard Dip"});
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
            price: 1195,
            image: '/images/products/ribs-single.png',
            addOn: [cornCarrots, bbqSauce],
            inclusion: [{productName: "Corn and Carrots"}]
        },

        {
            id: counter++,
            name: ribs + " (Double Rack)",
            category: main,
            price: 2295,
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
            price: 880,
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
        return Product.findOne({name: "Smoky Baby Back Ribs (Single Rack)"});
    })
    .then(function(result){
        ribsSingle = result._id;
        return Product.findOne({name: "Parmesan Baked Salmon (Medium)"});
    })
    .then(function(result){
        salmonMed = result._id;
        return BestSeller.insertMany([{productId: nachoSmall}, {productId: lasagnaMed}, {productId: ribsSingle}, {productId: salmonMed}]);
    })
    .then(function(result){
        var first = ["Aless", "Hannah", "Ibz", "John", "Jane"];
        var last = ["Gomez", "Fong", "Kahil", "Smith", "Smith"];
        var email = ["aless@gmail.com", "hannah@gmail.com", "ibz@gmail.com", "johnsmith@gmail.com", "jane.smith@gmail.com"];
        var pw = ["Aless12!", "Hannah1@3", "Ibz@45KH", "JOHN123@", "JaneS!!3"];
        var number = ["09260716958", "09123456789", "09987654321", "09456276833", "09125367283"];
        var address = ["159-C", "Paco, Manila", "Angeles, Pampanga", "Pasig", "Pasay"];
        var senior = ["", "", "", "ABC123", "1234-ABC"];
        var pwd = ["", "", "PWD001", "", "8910F"];
        const saltRounds = 10;
        var accounts = [];

        for (var i = 0; i < 5; i++)
        {
            var accountObj = {
                userID: i + 1,
                firstName: first[i],
                lastName: last[i],
                email: email[i],
                password: pw[i],
                contactNumber: number[i],
                completeAddress: address[i],
                seniorID: senior[i],
                pwdID: pwd[i]
            }
            accounts.push(accountObj);
        }

       
        bcrypt.hash(accounts[0].password, saltRounds, (err, hashed) => {
            if (!err)
            {
                accounts[0].password = hashed;
                Account.create(accounts[0], function(){
                    bcrypt.hash(accounts[1].password, saltRounds, (err, hashed) => {
                        if (!err)
                        {
                            accounts[1].password = hashed;
                            Account.create(accounts[1], function(){
                                bcrypt.hash(accounts[2].password, saltRounds, (err, hashed) => {
                                    if (!err)
                                    {
                                        accounts[2].password = hashed;
                                        Account.create(accounts[2], function(){
                                            bcrypt.hash(accounts[3].password, saltRounds, (err, hashed) => {
                                                if (!err)
                                                {
                                                    accounts[3].password = hashed;
                                                    Account.create(accounts[3], function(){
                                                        bcrypt.hash(accounts[4].password, saltRounds, (err, hashed) => {
                                                            if (!err)
                                                            {
                                                                accounts[4].password = hashed;
                                                                Account.create(accounts[4], function(){
                                                                    insertFeedback();
                                                                });
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    })
}


function insertFeedback()
{
    db.findMany(Account, {}, "", function(accounts){

        var feedback = [
            {
                id: 0,
                userid: accounts[0]._id,
                subject: "Food Spilled",
                message: "Hello! The cheese on top of the lasagna spilled upon receiving the order. Maybe you can improve your packaging to avoid this in the future. Nonetheless, my family loved the food. Thank you!"
            },

            {
                id: 1,
                userid: accounts[1]._id,
                subject: "Five-stars!",
                message: "Hi! Just wanted to tell you that my son's birthday celebration became extra special because of your food. All of our guests loved it and are asking for your contact details. Thank you and keep up the good work!"
            },

            {
                id: 2,
                userid: accounts[2]._id,
                subject: "Collaboration Proposal",
                message: "To whom it may concern, I am a food photographer and I believe that, if granted the opportunity to collaborate, I will be able to capture the great flavors of your food in photos which you can use to attract more customers. Let me know if you're interested! 🙂"
            },

            {
                id: 3,
                userid: accounts[3]._id,
                subject: "Late Delivery",
                message: "Hi, I ordered from you today for our family gathering but received the food 30 minutes late. My relatives were already very hungry so the late delivery really caused us inconveniene. Hope you can improve on this. Thanks."
            },

            {
                id: 4,
                userid: accounts[4]._id,
                subject: "I'm A Huge Fan",
                message: "Hello The Hungry Sibs! I really love your food as seen in my frequent orders and my friends also loved your food. They're hoping you can open a store in Bohol for our hometown friends to try your food as well! ❤"
            }
    ]
        Feedback.insertMany(feedback)

        .then(function (){
            db.findMany(Product, {}, "", function(productRes) {
            
                var orderItems = [
                    {
                        orderItemId: 0,
                        product: productRes[0]._id,
                        addOns: [],
                        quantity: 3,
                        totalPrice: 1185
                    },
        
                    {
                        orderItemId: 1,
                        product:   productRes[1]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 795
                    },
        
                    {
                        orderItemId: 2,
                        product:    productRes[2]._id,
                        addOns: [],
                        quantity: 2,
                        totalPrice: 2900
                    },
        
                    {
                        orderItemId: 3,
                        product:    productRes[3]._id,
                        addOns: [],
                        quantity: 4,
                        totalPrice: 2580
                    },
        
                    {
                        orderItemId: 4,
                        product:    productRes[4]._id,
                        addOns: [],
                        quantity: 6,
                        totalPrice: 7170
                    },
        
                    {
                        orderItemId: 5,
                        product:    productRes[5]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 2295
                    },
        
                    {
                        orderItemId: 6,
                        product:    productRes[6]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 1295
                    },
        
                    {
                        orderItemId: 7,
                        product:    productRes[7]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 2495
                    },
        
                    {
                        orderItemId: 8,
                        product:    productRes[8]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 450
                    },
        
                    {
                        orderItemId: 9,
                        product:    productRes[9]._id,
                        addOns: [],
                        quantity: 1,
                        totalPrice: 880
                    },
                ];
        
                OrderItem.insertMany(orderItems)

                .then(function(){
                    db.findMany(OrderItem, {}, "", function(itemRes)   {
                        
                        var bags = [
                            {
                                userId: 1, 
                                orderItems: [itemRes[0]._id, itemRes[1]._id],
                                subtotal: 1980,
                                deliveryFee: 50,
                                total: 2030
                            },
        
                            {
                                userId: 2,
                                orderItems:  [],
                                subtotal: 0,
                                deliveryFee: 50,
                                total: 0
                            },
        
                            {
                                userId: 3,
                                orderItems:  [],
                                subtotal: 0,
                                deliveryFee: 50,
                                total: 0
                            },
        
                            {
                                userId: 4,
                                orderItems: [itemRes[2]._id],
                                subtotal: 2900,
                                deliveryFee: 50,
                                total: 2950
                            },
        
                            {
                                userId: 5,
                                orderItems: [itemRes[3]._id],
                                subtotal: 2580,
                                deliveryFee: 50,
                                total: 2630
                            }
                        ]
        
                        Bag.insertMany(bags)

                        .then(function ()   {
                            db.findMany(Account, {}, "", function(accounts) {
                                db.findMany(OrderItem, {}, "", function (orderItems)    {
                                    var orders = [
                                        {
                                            orderId:  0,
                                            account:  accounts[0]._id,   //
                                            orderItems: [orderItems[4]._id, orderItems[5]._id],   //
                                            total:  9515,
                                            subtotal:  9465 ,
                                            deliveryFee:   50,
                                            discount:  undefined,
                                            orderDate:  new Date(),
                                            ETAMin: new Date(),
                                            ETAMax: new Date(),
                                            firstName:  accounts[0].firstName,
                                            lastName:   accounts[0].lastName,
                                            contactNumber:  accounts[0].contactNumber[0],
                                            completeAddress:    accounts[0].completeAddress[0],
                                            notes:  "",
                                            paymentMethod:  "Cash on Delivery",
                                            changeFor:  10000,
                                            cardNo: undefined,
                                            CVV:  undefined,
                                        },
                    
                                        {
                                            orderId:  1,
                                            account:  accounts[1]._id,   //
                                            orderItems: [orderItems[6]._id],   //
                                            total:  1345,
                                            subtotal:  1295 ,
                                            deliveryFee:   50,
                                            discount:  undefined,
                                            orderDate:  new Date(),
                                            ETAMin: new Date(),
                                            ETAMax: new Date(),
                                            firstName:  accounts[1].firstName,
                                            lastName:   accounts[1].lastName,
                                            contactNumber:  accounts[1].contactNumber[0],
                                            completeAddress:    accounts[1].completeAddress[0],
                                            notes:  "",
                                            paymentMethod:  "Cash on Delivery",
                                            changeFor:  2000,
                                            cardNo: undefined,
                                            CVV:  undefined,
                                        },
                    
                                        {
                                            orderId:  2,
                                            account:  accounts[2]._id,   //
                                            orderItems: [orderItems[7]._id],   //
                                            total:  2545,
                                            subtotal:  2495,
                                            deliveryFee:   50,
                                            discount:  undefined,
                                            orderDate:  new Date(),
                                            ETAMin: new Date(),
                                            ETAMax: new Date(),
                                            firstName:  accounts[2].firstName,
                                            lastName:   accounts[2].lastName,
                                            contactNumber:  accounts[2].contactNumber[0],
                                            completeAddress:    accounts[2].completeAddress[0],
                                            notes:  "",
                                            paymentMethod:  "Cash on Delivery",
                                            changeFor:  3000,
                                            cardNo: undefined,
                                            CVV:  undefined,
                                        },
                    
                                        {
                                            orderId:  3,
                                            account:  accounts[3]._id,   //
                                            orderItems: [orderItems[8]._id],   //
                                            total:  500,
                                            subtotal:  450,
                                            deliveryFee:   50,
                                            discount:  undefined,
                                            orderDate:  new Date(),
                                            ETAMin: new Date(),
                                            ETAMax: new Date(),
                                            firstName:  accounts[3].firstName,
                                            lastName:   accounts[3].lastName,
                                            contactNumber:  accounts[3].contactNumber[0],
                                            completeAddress:    accounts[3].completeAddress[0],
                                            notes:  "",
                                            paymentMethod:  "Cash on Delivery",
                                            changeFor:  500,
                                            cardNo: undefined,
                                            CVV:  undefined,
                                        },
                    
                                        {
                                            orderId:  4,
                                            account:  accounts[4]._id,   //
                                            orderItems: [orderItems[9]._id],   //
                                            total:  930,
                                            subtotal:  880 ,
                                            deliveryFee:   50,
                                            discount:  undefined,
                                            orderDate:  new Date(),
                                            ETAMin: new Date(),
                                            ETAMax: new Date(),
                                            firstName:  accounts[4].firstName,
                                            lastName:   accounts[4].lastName,
                                            contactNumber:  accounts[4].contactNumber[0],
                                            completeAddress:    accounts[4].completeAddress[0],
                                            notes:  "",
                                            paymentMethod:  "Cash on Delivery",
                                            changeFor:  1000,
                                            cardNo: undefined,
                                            CVV:  undefined,
                                        }
                                    ]

                                    Order.insertMany(orders)
                                    .then(function(){
                                        process.exit(0);
                                    })
                                })
                            })
                            
                        });
        
                    });
                    
                })
            });
        })
        
    })
   
}



/*

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

*/
        
/*
db.deleteMany(AddOn, {}, function(){});
db.deleteMany(Product, {}, function(){});
*/ 
//add best sellers 