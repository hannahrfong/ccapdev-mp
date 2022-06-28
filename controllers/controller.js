const db = require("../models/db.js");
const Product = require("../models/ProductModel.js");

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
        }

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
                case 'dnd': dnd.products.push(productObj); break;
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
            style: ["navbar", "contact"]
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
        const data = {
            style: ["bootstrap", "navbar", "addtobag"],
            script: ["bootstrap", "addtobag"]
        }
        res.render("addtobag", data);
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
    }
}

module.exports = controller;
