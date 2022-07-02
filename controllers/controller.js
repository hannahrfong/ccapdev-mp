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

    /*getBagContents: function (req, res){
        //get bag contents
        Bag.find({userId: req.session.user}).populate({
            path: "orderItems", 
            populate: {
                path: "product",
                path: "addOns"
            }
        }).exec(function(err, res){
           console.log("RESULT!: " + res); 
        });
    },*/

    getIndex: function (req, res) {
        const data = {
            style: ["navbar", "index"],
            script: ["index"], 
            bestSellers: [],
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
                    userId: 0,
                    orderItems: [],
                    subtotal: 0,
                    deliveryFee: 50,
                    total: 0,
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

                    bag.subtotal += orderItem.totalPrice;

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
                data.bag.total = bag.subtotal + bag.deliveryFee; 
                resolve("Success");
                reject("Failed");
            }) 
        })

        p.then((message) => {
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
        }).catch((message) => {
            console.log("This is in catch" + message);
        })
    
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
                price: parseFloat(products[i].price),
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
                            // console.log('data.orderItems');
                            // console.log(data.orderItems);
                            res.render("checkout", data);
                        }
                    num = num + 1;
                });
    
            });

        });

            

    },


    postAddOrder:   function(req, res)  {
        console.log('postAddOrder');
        res.redirect('/confirmation');
    },

    getUserId:   function(req, res)  {

        var userId = req.session.user;
        var query = {userID: userId};
        var projection = 'userID';
        
        db.findOne(Account, query, projection, function(result) {
            res.send(result);
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
        var userId = req.session.userId;

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

    getBagView: function(req, res){

    },

    getUpdateBagView: function(req, res){
        var _id = req.query._id;
        console.log("ID : " + _id);
        Bag.findOne({_id:_id}).populate("orderItems").exec(function(err, result){
            if(err) return handleError(err);
            console.log("RESULT : : : : : " + result);
        })

       /* Bag.findOne({orderItems:_id}).populate("orderItems").exec(function(err, result){
            if (err) return handleError(err);

            var orderItemId = result.orderItemId;
            var product = result.product;
            var addOns = result.addOns;
            var quantity = result.quantity;
            var totalPrice = result.totalPrice;

            console.log(orderItemId);
            console.log(product);
            console.log(addOns);
            console.log(quantity);
            console.log(totalPrice);
        });

        */
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

    postAddAccount: function (req, res) {
        var first = req.body.firstname;
        var last = req.body.lastname;
        var email = req.body.email;
        var pw = req.body.psw;
        var number = req.body.contactno;
        var address = req.body.address;
        var senior = req.body.scid;
        var pwd = req.body.pwdid;
        const saltRounds = 10;

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
                                    orderItems: []
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
        if (req.body.newpsw == undefined)
            db.updateOne(Account, {userID: req.session.user}, req.body, function (result) {});
        else
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
    },

    postUpdateArrayElement: function (req, res) {
        var val = req.body.val;
        var newVal = req.body.newVal;

        if (req.body.frm == "address")
            db.updateOne(Account, {userID: req.session.user, completeAddress: val}, {$set:{"completeAddress.$": newVal}}, function (result) {});
        else
            if (req.body.frm == "contact")
                db.updateOne(Account, {userID: req.session.user, contactNumber: val}, {$set:{"contactNumber.$": newVal}}, function (result) {});
    },

    getAddQuantity: function (req, res){
        var orderItemId = req.query.orderItemId;

        db.findOne(OrderItem, {orderItemId: orderItemId}, {"quantity": 1, "totalPrice": 1, "_id": 0}, function(result){
            var oldPrice = result.totalPrice;
            var newQuantity = result.quantity + 1;
            var newTotalPrice = (result.totalPrice / result.quantity) * newQuantity;

            db.updateOne(OrderItem, {orderItemId: orderItemId}, {quantity: newQuantity, totalPrice: newTotalPrice}, function(){
                console.log("NEW QUANT" + newQuantity);
                var newValues = {
                    oldPrice: oldPrice,
                    newQuantity: newQuantity,
                    newTotalPrice: newTotalPrice
                }
                res.send(newValues);
            })
        })
    }
}

module.exports = controller;


                /*
                Bag
                    - userId```````````````
                    - orderItems[]
                        - orderItemId`````````````````
                        - product
                            - id`````````````````
                            - name ```````````````````````
                            - category``````````````````````
                            - price````````````````````````
                            - image``````````````````````````
                            - addOn[]
                                - id````````````````
                                - name````````````````````````
                                - price````````````````
                                - flavor[]
                            - inclusion[]
                                - productName````````````
                                - quantity````````````````````

                        - addOns[]
                            - id
                            - name
                            - price
                            - flavor[]
                        - quantity``````````````````
                        - totalPrice```````````````````````
                */