var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    userid: {
        type: Number,
        required:true
    },

    orderitems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'
    }],

    orderdate: {
        type: Date
    }
   
});

module.exports = mongoose.model('Order', OrderSchema);
