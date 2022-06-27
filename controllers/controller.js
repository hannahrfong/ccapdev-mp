const db = require("../models/db.js");
const Product = require("../models/ProductModel.js");

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {

        db.findMany(Product, {}, '', function(products) {
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
                switch (products[i].category){
                    case 'main': main.products.push(products[i]); break;
                    case 'snack': snack.products.push(products[i]); break;
                    case 'dnd': dnd.products.push(products[i]); break;
                    case 'bundle': bundle.products.push(products[i]); 
                }
            }
            
            const data  = {
                style: ["navbar", "index"],
                script: ["index"],
                category: [main, snack, dnd, bundle]
            }
            res.render('index', data);
        });
    },

    getMenu: function (req, res) {
        const data = {
            style: ["navbarMenu", "menu"],
            topbar: true
        }
        res.render("menu", data);
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
    }
}

module.exports = controller;
