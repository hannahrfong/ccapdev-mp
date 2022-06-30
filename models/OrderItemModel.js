var mongoose = require('mongoose');
var OrderItemSchema = new mongoose.Schema({

    orderItemId: {
        type: Number,
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required:true
    },

    addOns: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'AddOn'
    }],

    quantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }
   
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
