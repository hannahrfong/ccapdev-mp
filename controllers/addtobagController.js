const db = require("../models/db.js");
const OrderItem = require("../models/OrderItemModel.js");
const Bag = require("../models/BagModel.js");
const Product = require("../models/ProductModel.js");

const addtobagController = {
    
    getItemPrice: function(req, res) {
        // your code here
        var name = req.query.name;

        db.findOne(Product, {name: name}, 'name', function(result)  {
            res.send(result);
        });
    }

    
}

module.exports = addtobagController;