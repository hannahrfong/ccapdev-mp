const db = require("../models/db.js");
const OrderItem = require("../models/OrderItemModel.js");
const Bag = require("../models/BagModel.js");

const addtobagController = {
    postSignUp: function (req, res) {
       

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */
        /*
        var fName = req.body.fName;
        var lName = req.body.lName;
        var idNum = req.body.idNum;
        var pw = req.body.pw;

        var user = {
            fName: fName,
            lName: lName,
            idNum: idNum,
            pw: pw
        }
        */
        var orderID = req.body.orderID
        var product = req.body.product
        var flavor = req.body.flavor
        var addOns = req.body.addOns
        var quantity = req.body.quantity
        // var unitPrice = 

        /*
            calls the function insertOne()
            defined in the `database` object in `../models/db.js`
            this function adds a document to collection `users`
        */
       
        db.insertOne(User, user, function(flag) {
            /*
            if(flag) {
                res.redirect('/success?fName=' + fName +'&lName=' + lName + '&idNum=' + idNum);
            }
            */
        });
        
    }

    
}

module.exports = addtobagController;