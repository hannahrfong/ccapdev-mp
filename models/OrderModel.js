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
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem',
        required: true
    }],

    orderCost: {
        type: Number,
        required: true
    },

    orderDate: {
        type: Date,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    completeAddress: {
        type: String,
        required: true
    },

    seniorID: {
        type: String
    },

    pwdID: {
        type: String
    },

    changeFor: {
        type: Number
    },

    cardNo: {
        type: Number
    },

    cvv: {
        type: Number
    }

    
   
});

module.exports = mongoose.model('Order', OrderSchema);
