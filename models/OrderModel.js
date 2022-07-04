var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    account: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required:true
    },

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem',
        required: true
    }],

    total: {
        type: Number,
        required: true
    },

    subtotal:  {
        type: Number,
        required: true
    },

    deliveryFee:   {
        type: Number,
        required: true
    },

    discount:   {
        type: Number
    },

    orderDate: {
        type: Date,
        required: true
    },

    ETAMin:    {
        type: Date,
        required: true
    },

    ETAMax:    {
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


    contactNumber: {
        type: String,
        required: true
    },

    completeAddress: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    paymentMethod: {
        type: String,
        required: true
    },

    changeFor: {
        type: Number
    },

    cardNo: {
        type: String
    },

    CVV: {
        type: String
    }

    
   
});

module.exports = mongoose.model('Order', OrderSchema);
