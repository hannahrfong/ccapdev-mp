var mongoose = require('mongoose');
var AddOnSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required:true
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('AddOn', AddOnSchema);