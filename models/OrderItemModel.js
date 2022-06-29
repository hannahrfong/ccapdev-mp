var mongoose = require('mongoose');
var OrderItemSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required:true
    },

    size: {
        type: String
    },

    flavor: {
        type: String
    },

    addOns: [{
        type: String
    }],

    quantity: {
        type: Number,
        required: true
    },

    unitPrice: {
        type: Number,
        required: true
    }
   
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
