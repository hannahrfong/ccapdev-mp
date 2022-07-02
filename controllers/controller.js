const db = require("../models/db.js");
const Product = require("../models/ProductModel.js");
const Feedback = require("../models/FeedbackModel.js");
const BestSeller = require("../models/BestSellerModel.js");
const AddOn = require("../models/AddOnModel.js")
const OrderItem = require("../models/OrderItemModel.js");
const Bag = require("../models/BagModel.js");
const Order = require("../models/OrderModel.js");
const Account = require("../models/AccountModel.js");
const bcrypt = require("bcrypt");

function getBagContents(userId, resolve, reject){
    Bag.find({userId: userId}).populate([
        {
            path: "orderItems",
            model: "OrderItem",
            populate: [{
                path: "product", 
                model: "Product",
                populate: [{
                    path: "addOn",
                    model: "AddOn"
                }]
            },
            {
                path: "addOns", 
                model: "AddOn"
            }
        ]

        }
    ]).exec(function(err, res){
        if (err) return handleError(err);

        var bag = {
            userId: 0, //fix!
            orderItems: [],
            subtotal: parseFloat(res[0].subtotal).toFixed(2),
            deliveryFee: parseFloat(res[0].deliveryFee).toFixed(2),
            total: parseFloat(res[0].total).toFixed(2),
        };

        for (var i = 0; i < res[0].orderItems.length; i++)
        {
            var orderItem = {
                orderItemId: res[0].orderItems[i].orderItemId,
                quantity: res[0].orderItems[i].quantity,
                totalPrice: parseFloat(res[0].orderItems[i].totalPrice).toFixed(2),
                product: {
                    id: res[0].orderItems[i].product.id,
                    name: res[0].orderItems[i].product.name,
                    addOn: [],
                    inclusion: []
                },
                addOns: []
            }

            for (var j = 0; j < res[0].orderItems[i].product.addOn.length; j++)
            {
                var addOn = {
                    name: res[0].orderItems[i].product.addOn[j].name,
                    price: parseFloat(res[0].orderItems[i].product.addOn[j].price).toFixed(2)
                }
                
                orderItem.product.addOn.push(addOn);
            }

            for (var k = 0; k < res[0].orderItems[i].product.inclusion.length; k++)
            {
                var inclusion = {
                    productName: res[0].orderItems[i].product.inclusion[k].productName,
                    quantity: res[0].orderItems[i].product.inclusion[k].quantity
                };    
                orderItem.product.inclusion.push(inclusion);   
            }

            for (var l = 0; l < res[0].orderItems[i].addOns.length; l++)
            {
                var addOnOuter = {
                    id: res[0].orderItems[i].addOns[l].id,
                    name: res[0].orderItems[i].addOns[l].name,
                    price: parseFloat(res[0].orderItems[i].addOns[l].price).toFixed(2)
                }
                orderItem.addOns.push(addOnOuter);
            }

            bag.orderItems.push(orderItem);
        }
        resolve(bag);
        reject("Failed");
    }) 
}

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getSignIn: function (req, res) {
        res.render("sign-in");
    },

    getRegister: function (req, res) {
        res.render("register");
    },

    getIndex: function (req, res) {
        const data = {
            style: ["navbar", "index"],
            script: ["index"], 
            bestSellers: [],
            bag: {}
        }

        let p = new Promise((resolve, reject) =>{
            return getBagContents(req.session.user, resolve, reject);
        })

        p.then((bag) => {
            data.bag = bag;
            console.log(data.bag.orderItems);
            BestSeller.find().populate("productId").exec(function(err, results){
                if (err) return handleError(err);
    
                for (var i=0;i < results.length; i++)
                {
                    var productObj = {
                        name: results[i].productId.name,
                        price: parseFloat(results[i].productId.price).toFixed(2),
                        image: results[i].productId.image,
                        id: results[i].productId.id
                    };
    
                    data.bestSellers.push(productObj);
                }
            });
            res.render("index", data);
        }).catch((message) => {
            console.log("This is in catch" + message);
        })
    
    },

    getMenu: function (req, res) {
        let p = new Promise((resolve, reject) =>{
            return getBagContents(req.session.user, resolve, reject);
        })

        p.then((bag) => {
        db.findMany(Product, {}, "", function(products){
            var main = {
                id: 'main',
                category: 'MAIN DISHES',
                products: []
            };
            
        var snack ={
            id: 'snack',
            category: 'SNACKS',
            products: []
        };

        var dnd ={
            id: 'dnd',
            category: 'DESSERTS & DRINKS',
            products: []
        };

        var bundle ={
            id: 'bundle',
            category: 'BUNDLE MEALS',
            products: []
        };

        for (var i = 0; i < products.length; i++)
        {
            var productObj = {
                name: products[i].name,
                price: parseFloat(products[i].price).toFixed(2),
                image: products[i].image,
                id: products[i].id
            };
            switch (products[i].category){
                case 'main': main.products.push(productObj); break;
                case 'snack': snack.products.push(productObj); break;
                case 'dessert': dnd.products.push(productObj); break;
                case 'drink': dnd.products.push(productObj); break;
                case 'bundle': bundle.products.push(productObj); 
            }
        }
        
        const data = {
            style: ["navbarMenu", "menu"],
            topbar: true,
            category: [main, snack, dnd, bundle],
            bag: bag
        }
        res.render("menu", data);
        });
    })
    },

    getContact: function (req, res) {
        const data = {
            style: ["navbar", "contact"],
            script: ["contact"]
        }
        res.render("contact", data);
    },

    getOrderHistory: function (req, res) {
        const data = {
            style: ["navbar", "orderhistory"]
        }
        res.render("orderhistory", data);
    },

    getAbout: function (req, res) {
        const data = {
            style: ["navbar", "about"]
        }
        res.render("about", data);
    },

    getProfile: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "profile"],
                    script: ["profile"],
                    partialName: ["profile"],
                    first: user.firstName, last: user.lastName, email: user.email
                }
                res.render("account", data);
            }
        });
    },

    getAddresses: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "addresses"],
                    script: ["addresses"],
                    partialName: ["addresses"],
                    address: user.completeAddress,
                    disableDel: Boolean(user.completeAddress.length == 1)
                }
                res.render("account", data);
            }
        });
    },

    getContactNums: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "contactnums"],
                    script:["contactnums"],
                    partialName: ["contactnums"],
                    contact: user.contactNumber,
                    disableDel: Boolean(user.contactNumber.length == 1)
                }
                res.render("account", data);
            }
        });
    },

    getID: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "id"],
                    script: ["id"],
                    partialName: ["id"],
                    sc: user.seniorID, pwd: user.pwdID
                }
                res.render("account", data);
            }
        });
    },

    getChangePassword: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "profile"],
                    script: ["changepw"],
                    partialName: ["changepw"]
                }
                res.render("account", data);
            }
        });
    },

    getAddAddress: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "profile"],
                    script: ["addaddress"],
                    partialName: ["addaddress"]
                }
                res.render("account", data);
            }
        });
    },

    getAddNumber: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "profile"],
                    script: ["addcontactnum"],
                    partialName: ["addcontactnum"]
                }
                res.render("account", data);
            }
        });
    },

    getAddID: function (req, res) {
        db.findOne(Account, {userID: req.session.user}, {}, function(user) {
            if (user != null)
            {
                const data = {
                    style: ["navbar", "accountdetails", "profile"],
                    script: ["addid"],
                    partialName: ["addid"]
                }
                res.render("account", data);
            }
        });
    },

    getAddToBag: function (req, res) {
        var query = {id: req.params.id};
        var projection = 'name image price addOn inclusion';

        db.findOne(Product, query, projection, function(result) {
            var productdetails = {
                name: result.name,
                image: result.image,
                price: result.price,
                addOn: result.addOn,
                inclusion: result.inclusion
            };

            var bool = false;
            if (productdetails.inclusion.length > 0 || productdetails.addOn.length > 0)
            {
                bool = true;
            }

            const data = {
                style: ["bootstrap", "navbar", "addtobag"],
                script: ["bootstrap", "addtobag"],
                productdetails: productdetails,
                addOns: [],
                inclusions: [],
                bCustomizable: bool
            }

            for (var i = 0; i < productdetails.addOn.length; i++)
            {
                var addOnObjId = productdetails.addOn[i] 
                db.findOne(AddOn, {_id: addOnObjId}, 'id name price', function(newRes)  {

                    var addOnObj = {
                        id: newRes.id,
                        name: newRes.name,
                        price: newRes.price
                    };
                    data.addOns.push(addOnObj);

                });
            }

            for (var i = 0; i < productdetails.inclusion.length; i++)
            {
                var inclusionObj = {
                    productName: productdetails.inclusion[i].productName,
                    quantity: productdetails.inclusion[i].quantity
                };

                data.inclusions.push(inclusionObj);
            }

            res.render("addtobag", data);
            
        });
        
    },

    getCheckout : function (req, res) {

        var userId = req.session.user; 

        var query = {userID: userId};
        var projection = 'firstName lastName email password contactNumber completeAddress seniorID pwdID';
        
        
        db.findOne(Account, query, projection, function(result) {

            var accountDetails = {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                password: result.password,
                contactNumber: result.contactNumber,
                completeAddress: result.completeAddress,
                seniorID: result.seniorID,
                pwdID: result.pwdID
            };

            const data = {
                style: ["bootstrap", "navbar", "checkout"],
                script: ["bootstrap", "checkout"],
                accountDetails: accountDetails,
                bag: {}
            }
    
            let p = new Promise((resolve, reject) =>{
                Bag.find({userId: req.session.user}).populate([
                    {
                        path: "orderItems",
                        model: "OrderItem",
                        populate: [{
                            path: "product", 
                            model: "Product",
                            populate: [{
                                path: "addOn",
                                model: "AddOn"
                            }]
                        },
                        {
                            path: "addOns", 
                            model: "AddOn"
                        }
                    ]
        
                    }
                ]).exec(function(err, res){
                    if (err) return handleError(err);
    
                    var bag = {
                        userId: 0, //fix!
                        orderItems: [],
                        subtotal: res[0].subtotal,
                        deliveryFee: res[0].deliveryFee,
                        total: res[0].total,
                    };
    
                    for (var i = 0; i < res[0].orderItems.length; i++)
                    {
                        var orderItem = {
                            orderItemId: res[0].orderItems[i].orderItemId,
                            quantity: res[0].orderItems[i].quantity,
                            totalPrice: res[0].orderItems[i].totalPrice,
                            product: {
                                id: res[0].orderItems[i].product.id,
                                name: res[0].orderItems[i].product.name,
                                addOn: [],
                                inclusion: []
                            },
                            addOns: []
                        }
    
                        for (var j = 0; j < res[0].orderItems[i].product.addOn.length; j++)
                        {
                            var addOn = {
                                name: res[0].orderItems[i].product.addOn[j].name,
                                price: res[0].orderItems[i].product.addOn[j].price
                            }
                            
                            orderItem.product.addOn.push(addOn);
                        }
    
                        for (var k = 0; k < res[0].orderItems[i].product.inclusion.length; k++)
                        {
                            var inclusion = {
                                productName: res[0].orderItems[i].product.inclusion[k].productName,
                                quantity: res[0].orderItems[i].product.inclusion[k].quantity
                            };    
                            orderItem.product.inclusion.push(inclusion);   
                        }
    
                        for (var l = 0; l < res[0].orderItems[i].addOns.length; l++)
                        {
                            var addOnOuter = {
                                id: res[0].orderItems[i].addOns[l].id,
                                name: res[0].orderItems[i].addOns[l].name,
                                price: res[0].orderItems[i].addOns[l].price
                            }
                            orderItem.addOns.push(addOnOuter);
                        }
    
                        bag.orderItems.push(orderItem);
                    }
    
                    data.bag = bag;
                    resolve("Success");
                    reject("Failed");
                }) 
            })
    
            p.then((message) => {
                
                res.render("checkout", data);
            }).catch((message) => {
                console.log("This is in catch" + message);
            })
        });

        
    
    },

    postCheckout:   function(req, res)  {

        var userID = req.session.user;
        const saltRounds = 10;
        var newOrderId;
        var currentDate = new Date();
        var datePlus20 = new Date();
        var datePlus30 = new Date();
        datePlus20.setMinutes(datePlus20.getMinutes() + 20);
        datePlus30.setMinutes(datePlus30.getMinutes() + 30);

        

        db.findMany(Order, {}, "", function(result){
            
            newOrderId = result.length + 1;

            db.findOne(Account, {userID: userID}, "", function (accountRes) {
                
                db.findOne(Bag, {userId: userID}, "orderItems total", function (bagRes){
                    var orderTotalCost = bagRes.total;
                   
                    if (req.body.seniorID.trim() != "" || req.body.pwdID.trim() != "")
                    {
                        orderTotalCost = orderTotalCost * 0.8;
                    }

                    if (typeof req.body.cardNo != "undefined" && typeof req.body.CVV != "undefined")
                    {
                        bcrypt.hash(req.body.cardNo, saltRounds, (err, hashedCardNo) => {
                            if (!err)
                            {
                                bcrypt.hash(req.body.CVV, saltRounds, (err, hashedCVV) => {
                                    if (!err)
                                    {
                                        var orderObj = {
                                            orderId: newOrderId,  
                                            account: accountRes._id,  
                                            orderItems: bagRes.orderItems,  
                                            orderTotalCost: orderTotalCost, 
                                            orderDate: currentDate,    
                                            ETAMin:    datePlus20,   
                                            ETAMax:     datePlus30,
                                            firstName: req.body.firstName,
                                            lastName:   req.body.lastName,
                                            contactNumber:  req.body.contactNumber,
                                            completeAddress: req.body.completeAddress,
                                            notes:  req.body.notes,
                                            seniorID:   req.body.seniorID,
                                            pwdID:  req.body.pwdID,
                                            paymentMethod: 'Credit Card',
                                            changeFor:  req.body.changeFor,
                                            cardNo: hashedCardNo,   
                                            CVV: hashedCVV       
                                        };

                                        
                                        
                                        // insert new order
                                        db.insertOne(Order, orderObj, function(flag)    {
                                            
                                        });
                                        

                                        // empty bag contents
                                        db.updateOne(Bag, {userId: userID}, {orderItems: [], subtotal: 0, total: 0}, function()  {
                                           
                                        });
                                        

                                        var url = '/confirmation/' + newOrderId;
                                        res.redirect(url);
                                    }
                                    else
                                    {
                                        console.log('error');   
                                    }
                                });
                            }
                            else
                            {
                                console.log('error');   
                            }
                            
                                
                            
                        });
                    }
                    else
                    {
                        var orderObj = {
                            orderId: newOrderId,  
                            account: accountRes._id,  
                            orderItems: bagRes.orderItems,  
                            orderTotalCost: orderTotalCost,
                            orderDate: currentDate,    
                            ETAMin:    datePlus20,   
                            ETAMax:     datePlus30,
                            firstName: req.body.firstName,
                            lastName:   req.body.lastName,
                            contactNumber:  req.body.contactNumber,
                            completeAddress: req.body.completeAddress,
                            notes:  req.body.notes,
                            seniorID:   req.body.seniorID,
                            pwdID:  req.body.pwdID,
                            paymentMethod: 'Cash on Delivery',
                            changeFor:  req.body.changeFor,
                            cardNo: undefined,    
                            CVV: undefined       
                
                        };

                        // insert new order
                        db.insertOne(Order, orderObj, function()    {});

                        // empty bag contents
                        db.updateOne(Bag, {userId: userID}, {orderItems: [], subtotal: 0, total: 0}, function()  {});
                
                        var url = '/confirmation/' + newOrderId;
                        res.redirect(url);
                    }
                    
                });
            });
        });
        
        
        
    },

                        /*
                        var datetime = "Last Sync: " + currentDate.getDate() + "/"
                                        + (currentDate.getMonth()+1)  + "/" 
                                        + currentDate.getFullYear() + " @ "  
                                        + currentDate.getHours() + ":"  
                                        + currentDate.getMinutes() + ":" 
                                        + currentDate.getSeconds();
                        
                        var time20 = "Last Sync: "   
                                            + plus20.getHours() + ":"  
                                            + plus20.getMinutes() + ":" 
                                            + plus20.getSeconds();

                        var time30 = "Last Sync: "   
                                        + plus30.getHours() + ":"  
                                        + plus30.getMinutes() + ":" 
                                        + plus30.getSeconds();
                        

                        console.log('atual date');
                        console.log(currentDate);
                        console.log(plus20);
                        console.log(plus30);

                        console.log('timestamp');
                        console.log(datetime);
                        console.log(time20);
                        console.log(time30)
                        */
                       
    getConfirmation: function (req, res) {
        var orderId = req.params.orderId;

        var query = {orderId: orderId};
        var projection = 'orderItems orderTotalCost ETAMin ETAMax contactNumber completeAddress notes paymentMethod';

        /*
        db.findOne(Order, query, projection, function(result) {

            var orderdetails = {
                orderItems: result.orderItems,
                orderTotalCost: result.orderTotalCost,
                ETAMin: result.ETAMin,
                ETAMax: result.ETAMax,
                contactNumber: result.contactNumber,
                completeAddress: result.completeAddress,
                notes: result.notes,
                paymentMethod: result.paymentMethod
            };

            const data = {
                style: ["bootstrap", "navbar", "confirmation"],
                script: ["bootstrap"],
                orderdetails: orderdetails
            };

            // get list of orderitem object(names, add ons, inclusions, etc), refer to getIndex

           
        });
        */
        //remove
        const data = {
            style: ["bootstrap", "navbar", "confirmation"],
            script: ["bootstrap"],
            
        };

        res.render("confirmation", data);



       
    },

    getSearch: function (req, res){
        db.findMany(Product, {name: {$regex: req.query.q, $options: 'i'}}, "", function (results) {
            const data = {
                style: ["navbarMenu", "search"],
                q: req.query.q, 
                nResults: results.length,
                results: []
            }

            for (var i = 0; i < results.length; i++)
            {
                var productObj = {
                    name: results[i].name,
                    price: results[i].price,
                    image: results[i].image,
                    id: results[i].id
                };
                data.results.push(productObj);
            }
            
            res.render("search", data);
        });
    },

    getSearchResults: function(req, res){
        db.findMany(Product, {name: {$regex: req.query.q, $options: 'i'}}, "", function (results) {
            const data = {
                q: req.query.q, 
                nResults: results.length,
                layout: false,
                results: []
            }

            for (var i = 0; i < results.length; i++)
            {
                var productObj = {
                    name: results[i].name,
                    price: results[i].price,
                    image: results[i].image
                };
                data.results.push(productObj);
            }
            
            res.render("partials\\result", data, function(err, html){
                if (err) throw err;
                res.send(html);
            });
        });        
    },

    getAddFeedback: function(req, res){
        var userID = req.session.user;
        var subject = req.query.subject;
        var message = req.query.message;
        var id = 0;
        
        db.findMany(Feedback, {}, "", function(result){
            id = result.length;

            db.findOne(Account, {userID: userID}, "", function(result){
                userObjID = result._id;

                db.insertOne(Feedback, {userid: userObjID, id: id, subject: subject, message: message}, function(flag){
                    res.send(flag);
                })
            });
        });
    },

    getAddOn: function(req, res) {
        var name = req.query.name;

        db.findOne(AddOn, {name: name}, 'id name price', function(result)  {
            res.send(result);
        });
    },

    getProduct: function(req, res) {
        var name = req.query.name;

        db.findOne(Product, {name: name}, '_id', function(result)  {
            res.send(result);
        });
    },

    getBag: function(req, res) {
        var userId = req.session.user;

        db.findOne(Bag, {userId: userId}, 'userId orderItems', function(result)  {
            res.send(result);
        });
    },

    getAccount: function(req, res) {
        var userId = req.query.userId;
        var projection = 'firstName lastName email password contactNumber completeAddress seniorID pwdID'

        db.findOne(Account, {userId: userId}, projection, function(result)  {
            res.send(result);
        });
    },


    getAllOrderItems: function(req, res){
        
        db.findMany(OrderItem, {}, "", function(result){
            res.send(result);
        });
    },

    getOrderItem: function(req, res) {
        var orderItemId = req.query.orderItemId;

        db.findOne(OrderItem, {orderItemId: orderItemId}, '_id', function(result)  {
            res.send(result);
        });
    },

    getUpdateBagItems: function(req, res)   {
        var _id = req.query._id;
        var orderItems = req.query.orderItems;
        var orderItemsLen = orderItems.length;
        var orderItemObjId = orderItems[orderItemsLen - 1];

        console.log("1 " + orderItems);
        console.log("2 " + orderItemsLen);
        console.log("3 " + orderItemObjId);

        db.updateOne(Bag, {_id: _id}, {orderItems: orderItems}, function()    {
            db.findOne(Bag, {_id: _id}, "", function(result1){
                var subtotal = result1.subtotal;
                var deliveryFee = result1.deliveryFee;

                console.log("4 " + subtotal);
                console.log("5 " + deliveryFee);

                db.findOne(OrderItem, {_id: orderItemObjId}, "totalPrice", function(result2){
                    var newSubtotal = subtotal + result2.totalPrice;
                    var newTotal = newSubtotal + deliveryFee;

                    console.log("6 " + newSubtotal);
                    console.log("7 " + newTotal);

                    db.updateOne(Bag, {_id: _id}, {subtotal: newSubtotal, total: newTotal}, function(flag){
                        console.log(flag);
                    });
                });
            });
        });
        res.redirect('/menu');
    },

    getAddOrderItem: function(req, res) {
        var orderItemId = req.query.orderItemId;
        var product = req.query.product;
        var addOns = req.query.addOns;
        var quantity = req.query.quantity;
        var totalPrice = req.query.totalPrice;

        var orderItem = {
            orderItemId: orderItemId,
            product: product,
            addOns: addOns,
            quantity: quantity,
            totalPrice: totalPrice
        };

        db.insertOne(OrderItem, orderItem, function()   {});        
    },

    postAddAccount: function (req, res) {
        var first = req.body.firstname;
        var last = req.body.lastname;
        var email = req.body.email;
        var pw = req.body.psw;
        var number = req.body.contactno;
        var address = req.body.address;
        const saltRounds = 10;

        if (req.body.scid == "")
            senior = [];
        else
            senior = req.body.scid;
        
        if (req.body.pwdid == "")
            pwd = [];
        else
            pwd = req.body.scid;

        db.findMany(Account, {}, "", function(result){
            id = result.length+1;
            db.findOne(Account, {email: email}, {email: 1}, function(result) {
                if (result == null)
                {
                    bcrypt.hash(pw, saltRounds, (err, hashed) => {
                        if (!err)
                            Account.create({userID: id, firstName: first, lastName: last, email: email, password: hashed,
                            contactNumber: number, completeAddress: address, seniorID: senior, pwdID: pwd}, function(error, result) {
                                req.session.user = result.userID;
                                req.session.name = result.firstName + " " + result.lastName;

                                console.log(req.session);

                                //add new bag for new user
                                var bag = {
                                    userId: req.session.user,
                                    orderItems: [],
                                    subtotal: 0,
                                    deliveryFee: 50,
                                    total: 0 
                                }
                                
                                db.insertOne(Bag, bag, function(){});

                                res.redirect('/');
                            });
                    });
                }
                else
                {
                    req.flash('error_msg', 'This account already exists.');
                    res.redirect('/register');
                }
            });
        });
    },

    postCheckAccount: function(req, res) {
        db.findOne(Account, {email: req.body.email}, {}, function(user) {
            if (user != null)
            {
                bcrypt.compare(req.body.psw, user.password, (err, result) => {
                    if (result)
                    {
                        req.session.user = user.userID;
                        req.session.name = user.firstName + " " + user.lastName;

                        console.log(req.session);
                        res.redirect('/');
                    }
                    else
                    {
                        req.flash('error_msg', 'Incorrect password. Please try again.');
                        res.redirect('/signin');
                    }
                });
            }
            else
            {
                req.flash('error_msg', 'This account is not registered.');
                res.redirect('/signin');
            }
        });
    },

    isPrivate: function(req, res, next) {
        if (req.session.user)
            return next();
        else
            res.redirect('/signin');
    },

    isPublic: function(req, res, next) {
        if (req.session.user)
            res.redirect('/');
        else
            return next();
    },

    getLogout: function(req, res) {
        if (req.session)
        {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                console.log("Session successfully destroyed.");
                res.redirect('/signin');
            });
        }
    },

    getDeleteAccount: function (req, res) {;
        db.updateMany(Account, {userID:{$gt:req.session.user}}, {$inc: {userID: -1}}, function(result){
            db.deleteOne(Account, {userID: req.session.user}, function(flag) {
                
                    db.updateMany(Bag, {userId:{$gt:req.session.user}}, {$inc: {userId: -1}}, function(result){
                        // deletes user's bag 
                        db.deleteOne(Bag, {userId: req.session.user}, function()    {
                            if (req.session)
                            {
                                req.session.destroy(() => {
                                    res.clearCookie('connect.sid');
                                    console.log("Session successfully destroyed.");
                                    res.redirect('/signin');
                                });
                            }
                        });
                    });
                });
        });
    },

    postUpdateDetails: function (req, res) {
        if (req.body.newpsw == undefined && req.body.email == undefined)
            db.updateOne(Account, {userID: req.session.user}, req.body, function (result) {});
        else
            if (req.body.newpsw != undefined && req.body.email == undefined)
            {
                db.findOne(Account, {userID: req.session.user}, {}, function(user) {
                    if (user != null)
                    {
                        bcrypt.compare(req.body.oldpsw, user.password, (err, result) => {
                            if (result)
                            {
                                bcrypt.compare(req.body.newpsw, user.password, (err, result) => {
                                    if (!result)
                                    {
                                        const saltRounds = 10;
                                        bcrypt.hash(req.body.newpsw, saltRounds, (err, hashed) => {
                                            if (!err)
                                                db.updateOne(Account, {userID: req.session.user}, {$set: {password: hashed}}, function (result) {
                                                    res.redirect('/profile');
                                                });
                                        });
                                    }
                                    else
                                    {
                                        req.flash('error_msg', 'Password must differ from current password. Please try again.');
                                        res.redirect('/changepw');
                                    }
                                });
                            }
                            else
                            {
                                req.flash('error_msg', 'Incorrect current password. Please try again.');
                                res.redirect('/changepw');
                            }
                        });
                    }
                });
            }
            else
            {
                db.findOne(Account, {$and:[{email: req.body.email}, {userID: {$ne: req.session.user}}]}, {}, function(user) {
                    if (user != null)
                    {
                        req.flash('error_msg', 'Email already in use. Please try again.');
                        res.redirect('/profile');
                    }
                    else
                    {
                        db.updateOne(Account, {userID: req.session.user}, {$set: {firstName: req.body.firstName, lastName: req.body.lastName,
                            email: req.body.email}}, function (result) {
                                res.redirect('/profile');
                            });
                    }
                })
            }
    },

    postUpdateArrayElement: function (req, res) {
        var val = req.body.val;
        var newVal = req.body.newVal;
        
        switch(req.body.frm) {
            case "address": db.updateOne(Account, {userID: req.session.user, completeAddress: val}, {$set:{"completeAddress.$": newVal}}, function (result) {}); break;
            case "contact": db.updateOne(Account, {userID: req.session.user, contactNumber: val}, {$set:{"contactNumber.$": newVal}}, function (result) {}); break;
            case "scid": db.updateOne(Account, {userID: req.session.user, seniorID: val}, {$set:{"seniorID.$": newVal}}, function (result) {}); break;
            case "pwdid": db.updateOne(Account, {userID: req.session.user, pwdID: val}, {$set:{"pwdID.$": newVal}}, function (result) {}); break;
        }
    },

    getAddQuantity: function (req, res){
        var orderItemId = req.query.orderItemId;

        db.findOne(OrderItem, {orderItemId: orderItemId}, "", function(result){
            var _id = result._id;
            var oldPrice = result.totalPrice;
            var newQuantity = result.quantity + 1;
            var newTotalPrice = (result.totalPrice / result.quantity) * newQuantity;

            db.updateOne(OrderItem, {orderItemId: orderItemId}, {quantity: newQuantity, totalPrice: newTotalPrice}, function(){
                
                db.findOne(Bag, {orderItems: _id}, "", function(result1){
                    var subtotal = result1.subtotal;
                    var deliveryFee = result1.deliveryFee;
    
                    var newSubtotal = subtotal - oldPrice + newTotalPrice;
                    var newTotal = newSubtotal + deliveryFee;
    
                    db.updateOne(Bag, {orderItems: _id}, {subtotal: newSubtotal, total: newTotal}, function(flag){});

                    var newValues = {
                        newQuantity: newQuantity,
                        newTotalPrice: newTotalPrice,
                        newSubtotal: newSubtotal,
                        deliveryFee: deliveryFee,
                        newTotal: newTotal,
                    }
                    res.send(newValues);
                });
            })
        })
    },

    getSubtractQuantity: function (req, res){
        var orderItemId = req.query.orderItemId;

        db.findOne(OrderItem, {orderItemId: orderItemId}, "", function(result){
            if (result.quantity > 1)
            {
                var _id = result._id;
                var oldPrice = result.totalPrice;
                var newQuantity = result.quantity - 1;
                var newTotalPrice = (result.totalPrice / result.quantity) * newQuantity;

                db.updateOne(OrderItem, {orderItemId: orderItemId}, {quantity: newQuantity, totalPrice: newTotalPrice}, function(){
                    
                    db.findOne(Bag, {orderItems: _id}, "", function(result1){
                        var subtotal = result1.subtotal;
                        var deliveryFee = result1.deliveryFee;
        
                        var newSubtotal = subtotal - oldPrice + newTotalPrice;
                        var newTotal = newSubtotal + deliveryFee;
        
                        db.updateOne(Bag, {orderItems: _id}, {subtotal: newSubtotal, total: newTotal}, function(flag){});

                        var newValues = {
                            newQuantity: newQuantity,
                            newTotalPrice: newTotalPrice,
                            newSubtotal: newSubtotal,
                            deliveryFee: deliveryFee,
                            newTotal: newTotal,
                        }
                        res.send(newValues);
                    });
                })
            }
            else 
                res.send(false);
        })
    },

    getDeleteOrderItem: function(req, res){
        var orderItemId = req.query.orderItemId;

        db.findOne(OrderItem, {orderItemId: orderItemId}, "", function(result){
            
            var id = result._id;
            var totalPrice = result.totalPrice;
            
            db.findOne(Bag, {orderItems: id}, "", function(result){
                var newSubtotal = result.subtotal - totalPrice;
                var deliveryFee = result.deliveryFee;
                var newTotal;

                var itemQuantity = result.orderItems.length - 1;
                if (itemQuantity == 0)
                    newTotal = newSubtotal;
                else 
                    newTotal = newSubtotal + deliveryFee; 
                
                var newValues = {
                    newSubtotal: newSubtotal,
                    newTotal: newTotal,
                    deliveryFee: deliveryFee
                };
                
                db.updateOne(Bag, {orderItems: id}, {$pull: { orderItems: id}, subtotal: newSubtotal, total: newTotal}, function(flag){
                    if (flag){
                        db.deleteOne(OrderItem, {_id: id}, function(flag){
                            if (flag)
                                res.send(newValues);
                        });
                    }
                })
            });



/*
            db.updateOne(Bag, {orderItems: id}, {$pull: { orderItems: id}}, function(flag){
                if (flag)
                {
                    db.findOne(Bag, {orderItems: id}, "", function(result){
                        var newSubtotal = result.subtotal - totalPrice;
                        var newTotal = newSubtotal + result.deliveryFee; 
                        
                        db.updateOne(Bag, {orderItems: id}, {subtotal: newSubtotal, total: newTotal}, function(flag){
                            if (flag){
                                db.deleteOne(OrderItem, {_id: id}, function(flag){
                                    res.send(flag);
                                });
                            }
                        })
                    });
                }
            })*/
        })
    },

    getItemQuantity: function (req, res){
        db.findOne(Bag, {userId: req.session.user}, "", function(result){
            var itemQuantity = result.orderItems.length;
            res.send(itemQuantity.toString());
        })
    }
}

module.exports = controller;