var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);