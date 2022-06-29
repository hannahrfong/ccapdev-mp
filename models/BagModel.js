var mongoose = require('mongoose');
var BagSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    orderId: {
        type: Number,
        required:true
    },

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'
    }]
   
});

module.exports = mongoose.model('Bag', BagSchema);
