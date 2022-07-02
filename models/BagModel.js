var mongoose = require('mongoose');
var BagSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'
    }],

    subtotal: {
        type: Number,
        required: true
    },

    deliveryFee: {
        type: Number,
        required: true
    },

    total: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('Bag', BagSchema);
