const db = require("../models/db.js");
const Product = require("../models/ProductModel.js");
const Feedback = require("../models/FeedbackModel.js");
const BestSeller = require("../models/BestSellerModel.js");
const { populate } = require("../models/ProductModel.js");

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
            style: ["navbar", "accountdetails", "profile"]
        }
        res.render("profile", data);
    },

    getAddToBag: function (req, res) {
        
        var query = {name: req.params.name};
        var projection = 'name image price';

        db.findOne(Product, query, projection, function(result) {
            var productdetails = {
                name: result.name,
                image: result.image,
                price: result.price
            };

            const data = {
                style: ["bootstrap", "navbar", "addtobag"],
                script: ["bootstrap", "addtobag"],
                productdetails: productdetails
            }
    
            res.render("addtobag", data);
        });
        
    },

    getCheckout: function (req, res) {
        const data = {
            style: ["bootstrap", "navbar", "checkout"],
            script: ["bootstrap"]
        }
        res.render("checkout", data);
    },

    getConfirmation: function (req, res) {
        const data = {
            style: ["bootstrap", "navbar", "confirmation"],
            script: ["bootstrap"]
        }
        res.render("confirmation", data);
    },

    getSearch: function (req, res){
        db.findMany(Product, {name: {$regex: req.query.search, $options: 'i'}}, "", function (results) {
            const data = {
                style: ["navbarMenu", "search"],
                search: req.query.search, 
                nResults: results.length,
                results: []
            }
    
            console.log(data.search);
            console.log(data.nResults);

            for (var i = 0; i < results.length; i++)
            {
                var productObj = {
                    name: results[i].name,
                    price: results[i].price,
                    image: results[i].image
                };
                data.results.push(productObj);
                console.log(data.results[i]);
            }
            
            res.render("search", data);
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
    }
}

module.exports = controller;