var mongoose = require('mongoose');
var BagSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true
    },

    orderid: {
        type: Number,
        required:true
    },

    orderitems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'
    }]
   
});

module.exports = mongoose.model('Bag', BagSchema);
