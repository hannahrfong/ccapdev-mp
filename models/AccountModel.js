var mongoose = require('mongoose');
var AccountSchema = new mongoose.Schema({
    userID: {
        type: Number,
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

    password: {
        type: String,
        required: true
    },

    contactNumber: [{
        type: String,
        required: true
    }],

    completeAddress: [{
        type: String,
        required: true
    }],

    seniorID: {
        type: String,
    },

    pwdID: {
        type: String,
    }
});

module.exports = mongoose.model('Account', AccountSchema);