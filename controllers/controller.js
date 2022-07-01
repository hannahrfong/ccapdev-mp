const db = require("../models/db.js");
const Product = require("../models/ProductModel.js");
const Feedback = require("../models/FeedbackModel.js");
const BestSeller = require("../models/BestSellerModel.js");
const { populate, findOne, listenerCount } = require("../models/ProductModel.js");
const AddOn = require("../models/AddOnModel.js")
const OrderItem = require("../models/OrderItemModel.js");
const Bag = require("../models/BagModel.js");
const Order = require("../models/OrderModel.js");
const Account = require("../models/AccountModel.js");
const bcrypt = require("bcrypt");
const { localsAsTemplateData } = require("hbs");
const { listeners } = require("../models/FeedbackModel.js");

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
            bestSellers: []
        }

        BestSeller.find().populate("productId").exec(function(err, results){
            if (err) return handleError(err);

            for (var i=0;i < results.length; i++)
            {
                var productObj = {
                    name: results[i].productId.name,
                    price: results[i].productId.price,
                    image: results[i].productId.image
                };

                data.bestSellers.push(productObj);
            }
        });
        res.render("index", data);
    },

    getMenu: function (req, res) {

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
                price: products[i].price,
                image: products[i].image
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
            category: [main, snack, dnd, bundle]
        }
        res.render("menu", data);
        });
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
        const data = {
            style: ["navbar", "accountdetails", "profile"],
            name: req.session.name
        }
        res.render("profile", data);
    },

    getAddresses: function (req, res) {
        const data = {
            style: ["navbar", "accountdetails", "addresses"]
        }
        res.render("addresses", data);
    },

    getContactNums: function (req, res) {
        const data = {
            style: ["navbar", "accountdetails", "contactnums"]
        }
        res.render("contactnums", data);
    },

    getID: function (req, res) {
        const data = {
            style: ["navbar", "accountdetails", "id"]
        }
        res.render("id", data);
    },

    getAddToBag: function (req, res) {
        var query = {name: req.params.name};
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

    /*
    getCheckout: function (req, res) {

        var userId = 0; //remove

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

            var bagQuery = {userId: userId};
            var bagProjection = 'userId orderItems';

            
            db.findOne(Bag, bagQuery, bagProjection, function (bagResult)   {
                
                bagList = bagResult.orderItems;
                bagList.length;
                console.log("bagList length: " + bagList.length);

                
                const data = {
                    style: ["bootstrap", "navbar", "checkout"],
                    script: ["bootstrap"],
                    accountDetails: accountDetails,
                    orderItems: []
                }
                console.log('baglist');
                console.log(bagList);


                for (var i = 0; i < bagList.length; i++)
                {
                    var orderItemQuery = {_id: bagList[i]};
                    var orderItemProjection = 'orderItemId product addOns quantity totalPrice';
                    
                    
                    db.findOne(OrderItem, orderItemQuery, orderItemProjection, function (orderItemResult)   {

                        data.orderItems.push(orderItemResult._id);
                        
                       // var productQuery = {_id: orderItemResult.product};
                       // var productProjection = 'name';
                        


                        /*
                        db.findOne(Product, productQuery, productProjection, function (productResult)   {

                            var addOnIds = orderItemResult.addOns;
                            

                            const orderItemObj = {
                                orderItemId: orderItemResult.orderItemId,
                                productName: productResult.name,
                                addOns: [],
                                quantity: orderItemResult.quantity,
                                totalPrice: orderItemResult.totalPrice
                            }
                            
    
                            /*
                            console.log("addOns Length: " + addOnIds.length);
                            for (var j = 0; j < addOnIds.length; j++)
                            {
                                var addOnObjId = addOnIds[j]; 
                                var addOnQuery = {_id: addOnObjId};
                                var addOnProjection = 'name';

                                db.findOne(AddOn, addOnQuery, addOnProjection, function (addOnResult)   {

                                    var addOnName = addOnResult.name;

                                    orderItemObj.addOns.push(addOnName);


                                    
                                    // data.orderItems.push(orderItemObj)
                                    

                                });  
                            }
                            
                           /*
                           data.orderItems.push(orderItemObj);
                            
                           console.log('data: ');
                           console.log(data);

                           console.log('numi: ' + i); 
                           if (numi == bagList.length - 1)
                           {
                               console.log('last numi')
                           }

                        });
                        
                       
                        numi += 1;
                        
                    });
                    
                }

                
                console.log('orderItems:');
                console.log(data.orderItems);
               
               
                res.render("checkout", data);
            });
        
            
        });

    
    },
    */

    getCheckout: function (req, res) {

        var userId = 0; 
        console.log('session user: ' + req.session.user);

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

            var bagQuery = {userId: userId};
            var bagProjection = 'userId orderItems';

            db.findOne(Bag, bagQuery, bagProjection, async function (bagResult)   {

                var bagList = bagResult.orderItems;

                const data = {
                    style: ["bootstrap", "navbar", "checkout"],
                    script: ["bootstrap", "checkout"],
                    accountDetails: accountDetails,
                    orderItems: [],
                    subTotal: 0,
                    deliveryFee: 50,
                    finalTotal: 0
                }   
   
                var num = 0;
                bagList.forEach(async (item) => {
                    var orderItemQuery = {_id: item};
                    const orderItemDoc = await OrderItem.findOne(orderItemQuery);
                    
                    var productQuery = {_id: orderItemDoc.product};
                    const productDoc = await Product.findOne(productQuery);

                    const orderItemObj = {
                        orderItemId: orderItemDoc.orderItemId,
                        productName: productDoc.name,
                        addOns: [],
                        quantity: orderItemDoc.quantity,
                        totalPrice: orderItemDoc.totalPrice
                    }

                    data.subTotal += orderItemDoc.totalPrice;
                    data.finalTotal = data.subTotal + data.deliveryFee;

                    /*
                    var addOnsList = orderItemDoc.addOns;

                    var num2 = 0;


                    if (addOnsList.length > 0)
                    {
                        addOnsList.forEach(async (addOn) => { 
                            var addOnQuery = {_id: addOn};
                            const addOnDoc = await AddOn.findOne(addOnQuery);
    
                            orderItemObj.addOns.push(addOnDoc.name);
    
                            console.log('IF');
                            console.log('addOns length: ' + addOnsList.length);
                            console.log('num: ' + num);
                            console.log('bagList: ' + bagList.length);

                            console.log('num2: ' + num2);
                            console.log('addOnsList length: ' + addOnsList.length);
                            

                            if(num2 == addOnsList.length - 1)
                            {
                                data.orderItems.push(orderItemObj);
                                
                            }
    
                            if (num == bagList.length && num2 == addOnsList.length - 1)
                            {
                                
                                console.log('data.orderItems.length:' + data.orderItems.length);
                                console.log('RENDERED ON IF!!!');
                                res.render("checkout", data);
                            }
                            num2 = num2 + 1;
    
    
                        });
                    }
                    else
                    {
                        data.orderItems.push(orderItemObj)

                        console.log('ELSE');
                        console.log('num: ' + num);
                        console.log('baglist length: ' + bagList.length);

                        if (num == bagList.length - 1)
                        {
                            
                            console.log('data.orderItems.length:' + data.orderItems.length);
                            console.log('RENDERED ON IF!!!');
                            console.log('RENDERED ON ELSE!!!');
                            res.render("checkout", data);
                        }
                    }    
                    */

                    data.orderItems.push(orderItemObj);
                    
                    if (num == bagList.length - 1)
                        {
                            console.log('data.orderItems');
                            console.log(data.orderItems);
                            res.render("checkout", data);
                        }
                    num = num + 1;
                });

               
                

            
                    
                
                
                
                
                


                
            });

        });

            

    },


    getConfirmation: function (req, res) {
        const data = {
            style: ["bootstrap", "navbar", "confirmation"],
            script: ["bootstrap"]
        }
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
                    image: results[i].image
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
        var userid = req.query.userid;
        var subject = req.query.subject;
        var message = req.query.message;
        var id = 0;
        
        db.findMany(Feedback, {}, "", function(result){
            id = result.length;

            db.insertOne(Feedback, {userid: userid, id: id, subject: subject, message: message}, function(flag){
                res.send(flag);
            })
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
        var userId = req.query.userId;

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

        db.updateOne(Bag, {_id: _id}, {orderItems: orderItems}, function()    {
            res.redirect('/menu');
        });
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

        db.insertOne(OrderItem, orderItem, function()   {
        });

        
    },

    getAddAccount: function (req, res) {
        var first = req.query.firstname;
        var last = req.query.lastname;
        var email = req.query.email;
        var pw = req.query.psw;
        var number = req.query.contactno;
        var address = req.query.address;
        const saltRounds = 10;

        db.findMany(Account, {}, "", function(result){
            id = result.length;
            db.findOne(Account, {email: email}, {email: 1}, function(result) {
                if (result == null)
                {
                    bcrypt.hash(pw, saltRounds, (err, hashed) => {
                        if (!err)
                            Account.create({userID: id, firstName: first, lastName: last, email: email, password: hashed,
                            contactNumber: number, completeAddress: address}, function(error, result) {
                                req.session.user = result._id;
                                req.session.name = result.firstName + " " + result.lastName;

                                console.log(req.session);
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

    getCheckAccount: function(req, res) {
        db.findOne(Account, {email: req.query.email}, {firstName: 1, lastName: 1, email: 1, password: 1, contactNumber: 1, completeAddress: 1}, function(user) {
            if (user != null)
            {
                bcrypt.compare(req.query.psw, user.password, (err, result) => {
                    if (result)
                    {
                        req.session.user = user._id;
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
                res.redirect('/signin');
            });
        }
    }
}

module.exports = controller;