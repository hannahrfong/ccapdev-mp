var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    userId: {
        type: Number,
        required:true
    },

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'
    }],

    orderDate: {
        type: Date
    }
   
});

module.exports = mongoose.model('Order', OrderSchema);
