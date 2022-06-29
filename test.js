const db = require("./models/db.js");
const Product = require("./models/ProductModel.js");

var counter = 0;
var lasagna = "Premium All Beef Lasagna";
var ribs = "Smoky Baby Rack Ribs";
var salmon = "Parmesan Baked Salmon";
var chicken = "Garlic Parmesan Wings";
var nachoBake = "Four Cheese Nacho Bake";
var bakedPotato = "Cheesy Bacon Baked Potatoes";
var truffleFries = "Parmesan Truffle Fries w/ Dip";
var twisterFries = "Twister Fries w/ Drip";
var cookies = "Reese's Chocochip Cookies";
var crinkles = "Chocolate Crinkles";
var cake = "Belgian Chocolate Cake";
var icedTea = "Houseblen Iced Tea";
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

db.connect();

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
        image: '/images/products/lasagna-small.png'
    },

    {
        id: counter++,
        name: lasagna + m,
        category: main,
        price: 795,
        image: '/images/products/lasagna-medium.png'
    },

    {
        id: counter++,
        name: lasagna + l,
        category: main,
        price: 1450,
        image: '/images/products/lasagna-large.png'
    },

    {
        id: counter++,
        name: ribs + "(Half Rack)",
        category: main,
        price: 645,
        image: '/images/products/ribs-half.png'
    },

    {
        id: counter++,
        name: ribs + "(Single Rack)",
        category: main,
        price: 1195,
        image: '/images/products/ribs-single.png'
    },

    {
        id: counter++,
        name: ribs + "(Double Rack)",
        category: main,
        price: 2295,
        image: '/images/products/ribs-double.png'
    },

    {
        id: counter++,
        name: salmon + m,
        category: main,
        price: 1295,
        image: '/images/products/salmon-medium.png'
    },

    {
        id: counter++,
        name: salmon + l,
        category: main,
        price: 2495,
        image: '/images/products/salmon-large.png'
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
        image: '/images/products/potato-small.png'
    },

    {
        id: counter++,
        name: bakedPotato + m,
        category: snack,
        price: 680,
        image: '/images/products/potato-medium.png'
    },

    {
        id: counter++,
        name: bakedPotato + l,
        category: snack,
        price: 1295,
        image: '/images/products/potato-large.png'
    },

    {
        id: counter++,
        name: truffleFries,
        category: snack,
        price: 495,
        image: '/images/products/truffle.png'
    },

    {
        id: counter++,
        name: twisterFries,
        category: snack,
        price: 495,
        image: '/images/products/twister.png'
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
        image: '/images/products/bday-medium.png'
    },

    {
        id: counter++,
        name: party + m,
        category: bundle,
        price: 1495,
        image: '/images/products/party-medium.png'
    },

    {
        id: counter++,
        name: holiday + m,
        category: bundle,
        price: 2450,
        image: '/images/products/holiday-medium.png'
    },

    {
        id: counter++,
        name: fiesta + m,
        category: bundle,
        price: 3700,
        image: '/images/products/fiesta-medium.png'
    },

    {
        id: counter++,
        name: bday + l,
        category: bundle,
        price: 4850,
        image: '/images/products/bday-large.png'
    },

    {
        id: counter++,
        name: party + l,
        category: bundle,
        price: 2795,
        image: '/images/products/party-large.png'
    },

    {
        id: counter++,
        name: holiday + l,
        category: bundle,
        price: 4650,
        image: '/images/products/holiday-large.png'
    },

    {
        id: counter++,
        name: fiesta + l,
        category: bundle,
        price: 7100,
        image: '/images/products/fiesta-large.png'
    }
]

db.deleteMany(Product, {}, function(){});
db.insertMany(Product, products, function(){});